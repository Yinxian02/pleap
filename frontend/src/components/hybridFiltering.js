import { kMeans, 
    euclideanDistance, 
    hammingDistance, 
    pearsonCorrelation, 
    getScoreArray, 
    getPreferencesArray, 
    getNearestCluster, 
    predictInitialRating, 
    predictNewLORating, 
    retrieveUserRatings, 
    getRatedLearningObjects, 
    retrieveLORatings, 
    getAllLearningStyles,
    getTopNPercentByRating} from './filteringFunctions';

const calculateContentPrediction = async (ratings, loScore, accessToken) => {
    const ratedLOs = await getRatedLearningObjects(ratings, accessToken);
    
    const ratingScores = ratings.map((rating) => ({
        id: rating.learningObjectId,
        score: getScoreArray(ratedLOs.find(lo => lo._id === rating.learningObjectId).score),
        // lrt: ratedLOs.find(lo => lo.id === rating.learningObjectId).learningResourceType, 
        learningResourceType: ratedLOs.find(lo => lo._id === rating.learningObjectId).educational.learningResourceType,
        rating: rating.rating,
    }));
    // console.log('Rated learning objects by user:', ratingScores);

    // apply k-means clustering to learning objects rated by by userLS
    const clustersLO = kMeans(ratingScores, 5, hammingDistance);
    // console.log('Rated learning objects clusters:', clustersLO);

    const nearestClusterLO = getNearestCluster(clustersLO, loScore);
    // console.log('nearest cluster lo:', nearestClusterLO, 'learning object score', loScore);
    const topN = 3;
    const sortedLOs = nearestClusterLO.points.sort((a, b) => pearsonCorrelation(loScore, a.score) - pearsonCorrelation(loScore, b.score));
    
    const topNnearestLOs = sortedLOs.slice(0, topN);
    // console.log('Top N nearest learning objects:', topNnearestLOs);
    
    // calculate predicted rating for new learning object
    return predictNewLORating(topNnearestLOs, loScore); 
}

const calculateCollaborativePrediction = (nearestClusterLS, userLS, ratingsForLO) => {
    const sortedClusterLS = nearestClusterLS.sort((a, b) => pearsonCorrelation(a.score, userLS) - pearsonCorrelation(b.score, userLS));
    // console.log('Sorted cluster LS:', sortedClusterLS);

    const topNclusterLS = sortedClusterLS.slice(0, 5);
    // console.log('Top N cluster LS:', topNclusterLS);

    const topNclusterLSRated = topNclusterLS.map(ls => {
        const userRating = ratingsForLO.find(r => r.userId === ls.id);   
        // console.log('User rating:', userRating);
        return {
            id: ls.id,
            score: ls.score,
            rating: userRating ? userRating.rating : 0
        }
    });
    // console.log('Top N cluster LS:', topNclusterLSRated);

    return predictNewLORating(topNclusterLSRated, userLS);
}

async function hybridFiltering(learningObjects, userId, learningPreferences, accessToken, weight){
    const userLS = getPreferencesArray(learningPreferences);
    // console.log('User LS:', userLS);

    const learningStyles = await getAllLearningStyles(accessToken);
    // console.log('Learning styles:', learningStyles);

    const learningStylesArray = learningStyles.map(ls => ({
        id: ls.id,
        score: getPreferencesArray(ls.score)
    }));
    // console.log('Learning styles:', learningStylesArray);

    // // apply k-means to cluster all students learning styles
    const clustersLS = kMeans(learningStylesArray, 4, euclideanDistance);
    // console.log('Learning styles clusters:', clustersLS);

    // select the nearest cluster to userLS
    const nearestClusterLS = getNearestCluster(clustersLS, userLS).points;
    // console.log('Nearest user learning style cluster:', nearestClusterLS);

    // get set of all learning objects rated by user
    const allRatingsByUser = await retrieveUserRatings(userId, accessToken);
    // const allRatingsByUser = [];
    // console.log('All ratings by user:', allRatingsByUser);

    const predictedRatings = [];

    for (let i = 0; i < learningObjects.length; i++) {
        const lo = learningObjects[i];
        // console.log('Learning object:', lo);
        const loScore = getScoreArray(lo.score);

        // get ratings for the learning object
        const ratingsForLO = await retrieveLORatings(lo._id, accessToken);
        // const ratingsForLO = []
        // console.log('Ratings for this learning object:', ratingsForLO);

        let predictedRating = 0;

        // console.log(learningObjects[i].educational.learningResourceType);
        if (ratingsForLO.length === 0 && allRatingsByUser.length === 0) {
            predictedRating = predictInitialRating(userLS, loScore);
        } else if (ratingsForLO.length === 0) {
            predictedRating = await calculateContentPrediction(allRatingsByUser, loScore, accessToken);
        // 
        } else if (allRatingsByUser.length === 0) {
            predictedRating = calculateCollaborativePrediction(nearestClusterLS, userLS, ratingsForLO);
        //     // console.log('Predicted collaborative rating:', predictedRating);
        } else {
            const r1 = calculateCollaborativePrediction(nearestClusterLS, userLS, ratingsForLO);
        //     // console.log('r1:', r1)
            const r3 = await calculateContentPrediction(allRatingsByUser, loScore, accessToken);
        //     // console.log('r3:', r3)
            predictedRating = weight * r1 + (1 - weight) * r3; 
        }

        console.log(i, 'Predicted rating:', predictedRating);
        predictedRatings.push({
            learningObjectId: lo._id,
            rating: predictedRating,
        });
    }
    // console.log('Unsorted predicted ratings:', predictedRatings);
    const topNPredictedRatings = getTopNPercentByRating(predictedRatings);

    // get learning objects with predicted ratings using learning object ids
    const filteredLearningObjects = learningObjects.filter(lo => {
        return topNPredictedRatings.map(p => p.learningObjectId).includes(lo._id);
    });
    console.log('Filtered above mean learning objects:', filteredLearningObjects);
    return filteredLearningObjects;
}

export { hybridFiltering };