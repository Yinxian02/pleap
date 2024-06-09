// Based on algorithm in On Recommendation of Learning Objects Using Felder-Silverman Learning Style Model
import axios from 'axios';
import  { kMeans, euclideanDistance, cosineSimilarity, pearsonCorrelation, getScoreArray, getPreferencesArray, calculateMean, calculateVectorsMean, hammingDistance, getNearestCluster, predictInitialRating, predictNewLORating} from './filteringFunctions';

async function retrieveUserRatings(id, accessToken) {
    try {
        const res = await axios.post(
            `http://localhost:5001/ratings/user`,
            { userId: id },
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

        if (!Array.isArray(res.data)|| res.data.length === 0) {
            return [];
        }

        const ratings = res.data;
        return ratings;
    } catch (error) {
        console.error('Error fetching user ratings by user:', error);
        return [];
    }
}

async function getRatedLearningObjects(ratings, accessToken) {
    const ratedIDs = ratings.map((rating) => rating.learningObjectId);
    try {
        const ratedLOs = await axios.post(
            'http://localhost:5001/learning-objects/batch',
            { ids: ratedIDs },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                    mode: 'cors',
                    withCredentials: true,
                },
            }
        );
        // console.log('Rated learning objects:', ratedLOs.data);
        return ratedLOs.data;
    } catch (error) {
        console.error('Error fetching rated learning objects:', error);
        return [];
    }
}

// learningObjects: set of learning objects for one lesson
async function contentBasedFiltering(learningObjects, userId, learningPreferences, accessToken){
    console.log('Learning objects: ', learningObjects);
            
    // get nearest cluster to user LS, by comparing euclidean distance to each centroid
    const userLS = getPreferencesArray(learningPreferences);
    // console.log('User LS:', userLS);

    // get set of all learning objects rated by LS
    const ratings = await retrieveUserRatings(userId, accessToken);
    console.log('Ratings:', ratings);
    
    // If ratings array is empty, 
    if (ratings.length === 0) {
        console.log('No ratings found');
        
        const loScores = learningObjects.map((lo) => ({
            id: lo._id,
            score: getScoreArray(lo.score),
        }));
        // console.log('Learning object scores: ', loScores);

        // Apply K-means to cluster all learning objects scores
        const clusters = kMeans(loScores, 2, hammingDistance);
        console.log('Clusters:', clusters);

        const nearestClusterLOs = getNearestCluster(clusters, userLS).points;
        // console.log('Nearest cluster LOs:', nearestClusterLOs);
        
        // predict initial ratings for learning objects in the nearest cluster
        const predictedRatings = nearestClusterLOs.map((lo) => ({
            learningObjectId: lo.id,
            rating: predictInitialRating(userLS, lo.score),
        }));
        // console.log('Predicted ratings:', predictedRatings);

        // get top 5 learning objects with highest predicted ratings
        predictedRatings.sort((a, b) => b.rating - a.rating);
        const topNPredictedRatings = predictedRatings.slice(0, 10);
        // console.log('Top N predicted ratings:', topNPredictedRatings);

        // get learning objects with predicted ratings using learning object ids
        const filteredLearningObjects = learningObjects.filter(lo => {
            return topNPredictedRatings.map(p => p.learningObjectId).includes(lo._id);
        });
        console.log('Filtered learning objects:', filteredLearningObjects);
        return filteredLearningObjects;
    } else {
        const ratedLOs = await getRatedLearningObjects(ratings, accessToken);
        const ratingScores = ratings.map((rating) => ({
            id: rating.learningObjectId,
            score: getScoreArray(ratedLOs.find(lo => lo._id === rating.learningObjectId).score),
            rating: rating.rating,
        }));
        // console.log('Rated learning objects:', ratingScores);

        // // apply k-means clustering to learning objects rated by by learning styles
        const clusters = kMeans(ratingScores, 2, euclideanDistance);
        // console.log('Clusters:', clusters);

        let predictedRatings = [];

        // for each learning object x, find nearest cluster by cosine similarity
        for (let i = 0; i < learningObjects.length; i++) {
            const newLO = learningObjects[i];
            const newLOScore = getScoreArray(newLO.score);
            const nearestCluster = getNearestCluster(clusters, newLOScore);
            // console.log('Nearest cluster:', nearestCluster);
        
            // get set of topN learning objects in the nearest cluster
           const topN = 5;
           const sortedLOs = nearestCluster.points.sort((a, b) => pearsonCorrelation(newLOScore, a.score) - pearsonCorrelation(newLOScore, b.score));
           
           const topNnearestLOs = sortedLOs.slice(0, topN);
           console.log('Top N nearest learning objects:', topNnearestLOs);
           
           // calculate predicted rating for new learning object
            const predictedRating = predictNewLORating(topNnearestLOs, newLOScore);
            // console.log('Predicted rating:', predictedRating);
            predictedRatings.push({id: newLO._id, rating: predictedRating});
        }
        // 
        console.log('Predicted ratings:', predictedRatings);

        predictedRatings.sort((a, b) => b.rating - a.rating);
        console.log('Sorted predicted ratings:', predictedRatings);

        const topNPredictedRatings = predictedRatings.slice(0, 10);
        console.log('Top N predicted ratings:', topNPredictedRatings);

        // get learning objects with predicted ratings using learning object ids
        const filteredLearningObjects = learningObjects.filter(lo => {
            return topNPredictedRatings.map(p => p.id).includes(lo._id);
        });
        console.log('Filtered learning objects:', filteredLearningObjects);
        return filteredLearningObjects;
    } 
}

export { contentBasedFiltering };