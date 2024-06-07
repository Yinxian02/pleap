// Based on algorithm in On Recommendation of Learning Objects Using Felder-Silverman Learning Style Model

const selectKRandomPoints = (data, k) => {
    if (k > data.length) {
        throw new Error("K cannot be larger than the dataset size");
    }

    const selectedIndices = new Set();

    while (selectedIndices.size < k) {
        const randomIndex = Math.floor(Math.random() * k);
        selectedIndices.add(randomIndex);
    }

    // get data points of selected indices
    const dataPoints = selectedIndices.map(index => data[index]);
    console.log('Selected data points:', dataPoints);

    return dataPoints;
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
    return data.reduce((acc, currentValue) => acc + currentValue, 0) / data.length;
}
  
const kMeans = (data, k, distanceFunction) => {
    // Step 1: Select K random points from dataset as initial cluster centroids
    let centroids = selectKRandomPoints(data, k);
    let prevCentroids = [];

    let clusters = Array.from({ length: k }, () => []);

    // Step 4: Repeat Steps 2 and 3 until the centroids no longer change
    while (!isEqual(centroids, prevCentroids)) {

        // Step 2: Create K clusters by associating each data point with its closest centroid
        for (let i = 0; i < data.length; i++) {
            const point = data[i];

            let distances = centroids.map((centroid) => distanceFunction(centroid, point));
            const closestDistance = Math.min(...distances);

            const closestCentroid = distances.indexOf(closestDistance);
            clusters[closestCentroid].push(point);
        }

        // Step 4: Save old centroids and update the centroids
        prevCentroids = centroids;
        centroids = clusters.map((cluster) => calculateMean(cluster));
    }
    return clusters;
}

const kMeansPredict = (data, centroids) => {
    let predictions = [];
    for (let point of data) {
        let distances = centroids.map((centroid) => euclideanDistance(point, centroid));
        let closestCentroid = distances.indexOf(Math.min(...distances));
        predictions.push(closestCentroid);
    }
    return predictions;

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

const pearsonCorrelation = (v1, v2) => {
    let sum1 = 0;
    let sum2 = 0;
    let sum1Sq = 0;
    let sum2Sq = 0;
    let pSum = 0;
    let n = v1.length;
    for (let i = 0; i < n; i++) {
        sum1 += v1[i];
        sum2 += v2[i];
        sum1Sq += v1[i] ** 2;
        sum2Sq += v2[i] ** 2;
        pSum += v1[i] * v2[i];
    }
    let num = pSum - (sum1 * sum2) / n;
    let den = Math.sqrt((sum1Sq - (sum1 ** 2) / n) * (sum2Sq - (sum2 ** 2) / n));
    return num / den;
}

async function retrieveLORatings(ids, userId, accessToken) {
    const request = {
        learningObjectIds: ids,
        userId: userId,
    };

    try {
        const res = await axios.post(
            `http://localhost:5001/ratings/batch`,
            request,
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

        const ratings = res.data.map((rating) => rating.rating);
        return ratings;
    } catch (error) {
        console.error('Error fetching learning objects ratings by user:', error);
        return [];
    }
}

// learningObjects: set of learning objects for one lesson
async function contentBasedFiltering(learningObjects, userId, accessToken){
    console.log('Learning objects: ', learningObjects);
    
    const learningObjectIds = learningObjects.map((lo) => lo._id);
    console.log('Learning object IDs: ', learningObjectIds);
    
    const learningObjectsScores = learningObjects.map((lo) => lo.score);
    console.log('Learning object scores: ', learningObjectsScores);

    // get learning objects with corresponding user ratings
    const ratings = retrieveLORatings(learningObjectIds, userId, accessToken);

    // If ratings array is empty, 
    if (ratings.length === 0) {
        // Apply K-means to cluster all learning objects scores
        const clusters = kMeans(learningObjectsScores, 2, hammingDistance);
        

    } else {
        // apply k-means clustering to learning objects rated by by learning styles
    }
    
    retrieveLORatings(learningObjectIds);
}