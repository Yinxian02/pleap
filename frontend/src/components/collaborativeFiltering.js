import axios from 'axios';
import  { kMeans, euclideanDistance, cosineSimilarity, pearsonCorrelation, getScoreArray, getPreferencesArray, calculateMean, calculateVectorsMean, hammingDistance, getNearestCluster, predictInitialRating, predictNewLORating } from './filteringFunctions';

async function retrieveLORatings (id, accessToken) {
    try {
        const res = await axios.post(
            `http://localhost:5001/ratings/learning-object`,
            { learningObjectId: id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                    mode: 'cors',
                    withCredentials: true,
                },
            }
        );
        console.log(res.data);

        if (!Array.isArray(res.data) || res.data.length === 0) {
            return [];
        }

        const ratings = res.data;
        return ratings;
    } catch (error) {
        console.error('Error fetching learning objects ratings:', error);
      return [];
    }
}

async function getAllLearningStyles(accessToken) {
    try {
        const res = await axios.post(
            `http://localhost:5001/users/learning-styles`,
            {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                    mode: 'cors',
                    withCredentials: true,
                },
            }
        );
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching learning styles:', error);
        return [];
    }
}

async function collaborativeFiltering(learningObjects, userId, learningPreferences, accessToken){
    // console.log('Learning objects: ', learningObjects);

    const userLS = getPreferencesArray(learningPreferences);
    console.log('User LS:', userLS);

    const learningStyles = await getAllLearningStyles(accessToken);
    // console.log('Learning styles:', learningStyles);

    const learningStylesArray = learningStyles.map(ls => ({
        id: ls.id,
        score: getPreferencesArray(ls.score)
    }));
    console.log('Learning styles:', learningStylesArray);

    // // apply k-means to cluster all students learning styles
    const clusters = kMeans(learningStylesArray, 2, euclideanDistance);
    console.log('Clusters:', clusters);

    // select the nearest cluster to userLS
    const nearestCluster = getNearestCluster(clusters, userLS);
    console.log('Nearest cluster:', nearestCluster);

    const predictedRatings = [];

    // for each learning object
    for (let i = 0; i < learningObjects.length; i++) {
        const lo = learningObjects[i];
        // console.log('Learning object:', lo);
        const loScore = getScoreArray(lo.score);

        // get ratings for the learning object
        const ratings = await retrieveLORatings(lo._id, accessToken);
        console.log('Ratings:', ratings);

        // if no ratings, assign average rating
        if (ratings.length === 0) {
            // console.log(userLS, lo.score);
            const predictedRating = predictInitialRating(userLS, loScore);
            console.log('Predicted rating:', predictedRating);
            predictedRatings.push({
                learningObjectId: lo._id,
                rating: predictedRating
            });
        } else {
            // set of top n nearest elements to userLS that have rated the learning object
            const nearestClusterLS = nearestCluster.points.map(ls => ls.id);
            const nearestClusterRatings = ratings.filter(r => nearestClusterLS.includes(r.userId));
            console.log('Nearest cluster ratings:', nearestClusterRatings);
            
            // nearestClusterRatings.sort((a, b) => b.)
            // const predictedRating = predictNewLORating(nearestClusterRatings, loScore);
            // const nearestLS = ratings.filter(r => {
            //     return nearestCluster.points.map(ls => ls.id).includes(r.userId);
            // });
            // const topNnearestLS = nearestLS.slice(0, 5);
            // const predictedRating = predictNewLORating(topNnearestLS, userLS);

            // console.log('Nearest LSs:', nearestLS);
            // const predictedRating = 
        }

        // get the ratings of the nearest cluster LOs


    }
    console.log('Predicted ratings:', predictedRatings);
    predictedRatings.sort((a, b) => b.rating - a.rating);
    console.log('Sorted predicted ratings:', predictedRatings);

    const topNPredictedRatings = predictedRatings.slice(0, 10);
    console.log('Top N predicted ratings:', topNPredictedRatings);

    // get learning objects with predicted ratings using learning object ids
    const filteredLearningObjects = learningObjects.filter(lo => {
        return topNPredictedRatings.map(p => p.learningObjectId).includes(lo._id);
    });
    console.log('Filtered learning objects:', filteredLearningObjects);
    return filteredLearningObjects;

    // 
}

export { collaborativeFiltering };