import axios from 'axios';

const arrayContainsVector = (array, vector) => {
    for (let i = 0; i < array.length; i++) {
        // console.log('Comparing:', array[i], vector, isEqual(array[i], vector));
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

// data is an array of numbers
const calculateMean = (data) => {
    let result = 0;
    for (let i = 0; i < data.length; i++) {
       result += data[i];
    }
    return result / data.length;
};

// data is an array of vectors
const calculateVectorsMean = (data) => {
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
    // console.log('Data:', data);
    const centroids = [];
    const n = data.length;

    // choose the first centroid randomly from the data points
    const firstCentroidIndex = Math.floor(Math.random() * n);
    centroids.push(data[firstCentroidIndex]);
    // console.log('First centroid:', centroids[0]);

    // choose remaining k-1 centroids

    for (let i = 1; i < k; i++) {
        // console.log('Centroids:', centroids);
        const distances = data.map(d => {
            const minDistance = Math.min(
                ...centroids.map(centroid => distanceFunction(d.score, centroid.score))
            );
            // console.log('Min distance:', minDistance);
            return minDistance * minDistance;
        });
        // console.log('Distances:', distances);

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

    // console.log('Centroids:', centroids);
    return centroids;
};

const kMeans = (data, k, distanceFunction) => {
    // Step 1: Select K random points from dataset as initial cluster centroids

    // let centroids = selectKRandomPoints(data, k).map(point => point.score);;
    
    // Use k-means++ algorithm to select initial centroids
    let centroids = kMeansPlusPlus(data, k, distanceFunction).map(point => point.score);
    // console.log('Selected data points:', centroids);
    let prevCentroids = [];

    let clusters = centroids.map(centroid => ({ centroid: centroid, points: [] }));
    // console.log('Clusters:', clusters);

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
            // console.log("Clusters after one iteration:", clusters);
        }

    //     // Step 4: Save old centroids and update the centroids
        prevCentroids = centroids;
        clusters.forEach(cluster => {
            cluster.centroid = calculateVectorsMean(cluster.points.map(point => point.score));
            // console.log("New centroid:", cluster.centroid);
        });
        // console.log("Clusters after updating centroids:", clusters);
        centroids = clusters.map(cluster => cluster.centroid);

        // console.log('COMPARE:', isEqual(centroids, prevCentroids));
        iterations++;
    }
    // console.log(clusters);
    return clusters;
}

const cosineSimilarity = (x, y) => {
    const n = x.length;
    let dotProduct = 0;
    let normX = 0;
    let normY = 0;

    for (let i = 0; i < n; i++) {
        dotProduct += x[i] * y[i];
        normX += x[i] ** 2;
        normY += y[i] ** 2;
    }
    return dotProduct / (Math.sqrt(normX) * Math.sqrt(normY));
}

const pearsonCorrelation = (x, y) => {
    let n = x.length;

    let xMean = calculateMean(x);
    let yMean = calculateMean(y);
    // console.log('Means:', xMean, yMean);

    let accXY = 0;
    let accX = 0;
    let accY = 0;
    
    for (let i = 0; i < n; i++) {
        accXY += (x[i] - xMean) * (y[i] - yMean);
        accX += (x[i] - xMean) ** 2;
        accY += (y[i] - yMean) ** 2;
    }
    
    // console.log('accX', accX, 'accY', accY, 'accXY', accXY);
    // if (accX === 0 || accY === 0) {
    //     return 0;
    // };

    // console.log('Pearson correlation:', accXY / Math.sqrt(accX * accY));
    return accXY / Math.sqrt(accX * accY);
}

const getScoreArray = (score) => {
    return [score.act, score.ref, score.vis, score.ver, score.sen, score.int, score.seq, score.glo];
}

const getPreferencesArray = (preferences) => {
    return [preferences.active, preferences.reflexive, preferences.visual, preferences.verbal, preferences.sensing, preferences.intuitive, preferences.sequential, preferences.global];
}

const getNearestCluster = (clusters, x) => {
    // get closest cluster by cosine similarity
    const distancesToCentroids = clusters.map((cluster) => cosineSimilarity(cluster.centroid, x));
    // const distancesToCentroids = clusters.map((cluster) => euclideanDistance(cluster.centroid, userLS));
    // console.log('Distances to centroids:', distancesToCentroids);

    const closestDistance = Math.max(...distancesToCentroids);
    // console.log("Closest distance:", closestDistance);

    const closestClusterNum = distancesToCentroids.indexOf(closestDistance);
    // console.log('Closest cluster:', closestClusterNum);

    // get learning objects in the closest cluster
    const closestCluster = clusters[closestClusterNum];
    // console.log('Closest cluster:', closestCluster);

    // const closestClusterLOs = closestCluster.points;
    return closestCluster;
}

const predictInitialRating = (userLS, loScore) => {
    return Math.floor(0.5 + pearsonCorrelation(userLS, loScore) * 5);
}

const predictNewLORating = (topNnearestLOs, newLOScore) => {
    let accNum = 0;
    let accDen = 0;
    for (let i = 0; i < topNnearestLOs.length; i++) {
        const lo = topNnearestLOs[i];
        const loScore = lo.score;
        const rating = lo.rating;
        // console.log('rated LO', lo)
        // console.log('new LO', newLOScore);
        const similarity = pearsonCorrelation(loScore, newLOScore);
        // console.log('Similarity:', similarity);
        accNum += similarity * rating;
        accDen += similarity;
    }
    // console.log('AccNum:', accNum);
    // console.log('AccDen:', accDen);
    if (accDen === 0) {
        return 0;
    }
    return accNum / accDen;
}


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
        // console.log(res.data);

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
        // console.log(res.data);

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

const getTopNPercentByRating = (ratings) => {
    ratings.sort((a, b) => b.rating - a.rating);
    console.log('Sorted predicted ratings:', ratings);

    const totalRating = ratings.reduce((acc, lo) => acc + lo.rating, 0);
    // console.log('Total rating:', totalRating);
    
    // get median
    let medianRating;
    const len = ratings.length;

    if (len % 2 === 0) {
        medianRating = (ratings[len / 2 - 1].rating + ratings[len / 2].rating) / 2;
    } else {
        medianRating = ratings[Math.floor(len / 2)].rating;
    }

    console.log('Median rating:', medianRating);
    return ratings.filter(lo => lo.rating >= medianRating);
}

export { kMeans, 
        euclideanDistance, 
        cosineSimilarity, 
        pearsonCorrelation, 
        getScoreArray, 
        getPreferencesArray, 
        calculateMean, 
        calculateVectorsMean,
        hammingDistance, 
        getNearestCluster, 
        predictInitialRating, 
        predictNewLORating, 
        retrieveUserRatings, 
        getRatedLearningObjects, 
        retrieveLORatings,
        getAllLearningStyles, 
        getTopNPercentByRating}