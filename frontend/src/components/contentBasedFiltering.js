// Based on algorithm in On Recommendation of Learning Objects Using Felder-Silverman Learning Style Model
import axios from 'axios';

const arrayContainsVector = (array, vector) => {
    for (let i = 0; i < array.length; i++) {
        console.log('Comparing:', array[i], vector, isEqual(array[i], vector));
        if (isEqual(array[i], vector)) {
            return true;
        }
    }
    return false;
}
// const selectKRandomPoints = (data, k) => {
//     const selectedIndices = new Set();
//     const selectedPoints = [];

//     while (selectedIndices.size < k) {
//         const randomIndex = Math.floor(Math.random() * data.length);
//         const point = data[randomIndex];

//         if (!arrayContainsVector(selectedPoints.map(p => p.score), point.score)) {
//             selectedIndices.add(randomIndex);
//             console.log('Selected point:', point);
//             selectedPoints.push(point);
//         }
//     }
//     return selectedPoints;
// }

const isEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}
// x and y are 2 real-valued vectors of size n
const euclideanDistance = (x, y) => {
    const n = x.length;
    let sum = 0;

    for (let i = 0; i < n; i++) {
        sum += (x[i] - y[i]) ** 2;
    }
    return Math.sqrt(sum);
}

// distance between 2 binary vectors of size n
const hammingDistance = (x, y) => {
    const n = x.length;
    let distance = 0;
    for (let i = 0; i < n; i++) {
        if (x[i] !== y[i]) {
            distance++;
          }
    }
    return distance;
}

const calculateMean = (data) => {
    if (data.length === 0) return [];

    const numVectors = data.length;
    const vectorLength = data[0].length;

    const result = new Array(vectorLength).fill(0);

    for (let i = 0; i < numVectors; i++) {
        for (let j = 0; j < vectorLength; j++) {
            result[j] += data[i][j];
        }
    }

    // Divide by the number of vectors to get the mean
    for (let j = 0; j < vectorLength; j++) {
        result[j] /= numVectors;
    }

    return result;
}

const kMeansPlusPlus = (data, k, distanceFunction) => {
    console.log('Data:', data);
    const centroids = [];
    const n = data.length;

    // choose the first centroid randomly from the data points
    const firstCentroidIndex = Math.floor(Math.random() * n);
    centroids.push(data[firstCentroidIndex]);
    console.log('First centroid:', centroids[0]);

    // choose remaining k-1 centroids

    for (let i = 1; i < k; i++) {
        console.log('Centroids:', centroids);
        const distances = data.map(d => {
            const minDistance = Math.min(
                ...centroids.map(centroid => distanceFunction(d.score, centroid.score))
            );
            console.log('Min distance:', minDistance);
            return minDistance * minDistance;
        });
        console.log('Distances:', distances);

        const totalDistance = distances.reduce((sum, d) => sum + d, 0);
        const threshold = Math.random() * totalDistance;

        let cumulativeDistance = 0;
        for (let j = 0; j < n; j++) {
            cumulativeDistance += distances[j];
            if (cumulativeDistance >= threshold && !arrayContainsVector(centroids, data[j])) {
                centroids.push(data[j]);
                break;
            }
        }
        
        if (centroids.length < i + 1) {
            i--;
        }
    }

    console.log('Centroids:', centroids);
    return centroids;
};

const kMeans = (data, k, distanceFunction) => {
    // Step 1: Select K random points from dataset as initial cluster centroids

    // let centroids = selectKRandomPoints(data, k).map(point => point.score);;
    
    // Use k-means++ algorithm to select initial centroids
    let centroids = kMeansPlusPlus(data, k, distanceFunction).map(point => point.score);
    console.log('Selected data points:', centroids);
    let prevCentroids = [];

    let clusters = centroids.map(centroid => ({ centroid: centroid, points: [] }));
    console.log('Clusters:', clusters);

    const maxIterations = 100;
    let iterations = 0;

    
    // Step 4: Repeat Steps 2 and 3 until the centroids no longer change
    while (!isEqual(centroids, prevCentroids) && iterations < maxIterations) {
        // console.log('centroids still changing');
        clusters.forEach(cluster => cluster.points = []);

    //     // Step 2: Create K clusters by associating each data point with its closest centroid
        for (let i = 0; i < data.length; i++) {
            const point = data[i];
            // console.log("Point:", point);

            let distances = clusters.map((cluster) => distanceFunction(cluster.centroid, point.score));
            // console.log("Distances:", distances);

            const closestDistance = Math.min(...distances);
            // console.log("Closest distance:", closestDistance);

            const closestCentroid = distances.indexOf(closestDistance);
            // console.log("Closest centroid:", closestCentroid);      
            
            clusters[closestCentroid].points.push(point);
            console.log("Clusters after one iteration:", clusters);
        }

    //     // Step 4: Save old centroids and update the centroids
        prevCentroids = centroids;
        clusters.forEach(cluster => {
            cluster.centroid = calculateMean(cluster.points.map(point => point.score));
            // console.log("New centroid:", cluster.centroid);
        });
        // console.log("Clusters after updating centroids:", clusters);
        centroids = clusters.map(cluster => cluster.centroid);

        console.log('COMPARE:', isEqual(centroids, prevCentroids));
        iterations++;
    }
    // console.log(clusters);
    return clusters;
}

const cosineSimilarity = (v1, v2) => {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < v1.length; i++) {
        dotProduct += v1[i] * v2[i];
        normA += v1[i] ** 2;
        normB += v2[i] ** 2;
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const pearsonCorrelation = (x, y) => {
    let n = x.length;

    let xMean = x.reduce((a, b) => a + b) / n;
    let yMean = y.reduce((a, b) => a + b) / n;

    let accXY = 0;
    let accX = 0;
    let accY = 0;
    
    for (let i = 0; i < n; i++) {
        accXY += (x[i] - xMean) * (y[i] - yMean);
        accX += (x[i] - xMean) ** 2;
        accY += (y[i] - yMean) ** 2;
    }

    console.log('Pearson correlation:', accXY / Math.sqrt(accX * accY));
    return accXY / Math.sqrt(accX * accY);
}

const getScoreArray = (score) => {
    return [score.act, score.ref, score.vis, score.ver, score.sen, score.int, score.seq, score.glo];
}

const getPreferencesArray = (preferences) => {
    return [preferences.active, preferences.reflexive, preferences.visual, preferences.verbal, preferences.sensing, preferences.intuitive, preferences.sequential, preferences.global];
}

async function retrieveLORatings(ids, userId, accessToken) {
    try {
        const res = await axios.post(
            `http://localhost:5001/ratings/batch`,
            { learningObjectIds: ids, userId: userId },
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

        const ratings = res.data.map((rating) => rating.rating);
        return ratings;
    } catch (error) {
        console.error('Error fetching learning objects ratings by user:', error);
        return [];
    }
}

const getNearestCluster = (clusters, userLS) => {
    const distancesToCentroids = clusters.map((cluster) => euclideanDistance(cluster.centroid, userLS));
    // console.log('Distances to centroids:', distancesToCentroids);

    const closestDistance = Math.min(...distancesToCentroids);
    // console.log("Closest distance:", closestDistance);

    const closestClusterNum = distancesToCentroids.indexOf(closestDistance);
    // console.log('Closest cluster:', closestClusterNum);

    // get learning objects in the closest cluster
    const closestCluster = clusters[closestClusterNum];
    // console.log('Closest cluster:', closestCluster);

    const closestClusterLOs = closestCluster.points;
    return closestClusterLOs;
}

const predictInitialRating = (userLS, loScore) => {
    return 0.5 + pearsonCorrelation(userLS, loScore) * 5;
}

// learningObjects: set of learning objects for one lesson
async function contentBasedFiltering(learningObjects, userId, learningPreferences, accessToken){
    console.log('Learning objects: ', learningObjects);
    
    const learningObjectIds = learningObjects.map((lo) => lo._id);
    console.log('Learning object IDs: ', learningObjectIds);
    
    // const loScores = learningObjects.map((lo) => getScoreArray(lo.score));
    const loScores = learningObjects.map((lo) => ({
        id: lo._id,
        score: getScoreArray(lo.score),
    }));
    console.log('Learning object scores: ', loScores);

    // get learning objects with corresponding user ratings
    const ratings = await retrieveLORatings(learningObjectIds, userId, accessToken);
    console.log('Ratings:', ratings);
    // If ratings array is empty, 
    
    if (ratings.length === 0) {
        console.log('No ratings found');

        // Apply K-means to cluster all learning objects scores
        const clusters = kMeans(loScores, 2, hammingDistance);
        console.log('Clusters:', clusters);
        
        // get nearest cluster to user LS, by comparing euclidean distance to each centroid
        const userLS = getPreferencesArray(learningPreferences);
        // console.log('User LS:', userLS);

        const nearestClusterLOs = getNearestCluster(clusters, userLS);
        console.log('Nearest cluster LOs:', nearestClusterLOs);
        
        // predict initial ratings for learning objects in the nearest cluster
        const predictedRatings = nearestClusterLOs.map((lo) => ({
            learningObjectId: lo.id,
            rating: predictInitialRating(lo.score, userLS),
        }));
        console.log('Predicted ratings:', predictedRatings);

        // get top 5 learning objects with highest predicted ratings
        predictedRatings.sort((a, b) => b.rating - a.rating);
        console.log('Sorted predicted ratings:', predictedRatings);
        predictedRatings.slice(0, 5);

        // get learning objects with predicted ratings using learning object ids
        const filteredLearningObjects = learningObjects.filter(lo => {
            return predictedRatings.map(p => p.learningObjectId).includes(lo._id);
        });
        console.log('Filtered learning objects:', filteredLearningObjects);

        
    } else {
        // apply k-means clustering to learning objects rated by by learning styles
    }
    
}

export { contentBasedFiltering };