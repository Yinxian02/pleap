// on recomendation model

// k-means algorithm
function kMeans(data, k) {
    // 1. Select K random points from dataset as initial cluster centroids
    let centroids = data.slice(0, k);
    let oldCentroids = [];
    let clusters = Array.from({ length: k }, () => []);
    let i = 0;

    // Step 2: Repeat until the centroids do not change
    while (!isEqual(centroids, oldCentroids)) {
        // Step 3: Assign each data point to the nearest centroid
        clusters = Array.from({ length: k }, () => []);
        for (let point of data) {
            let distances = centroids.map((centroid) => euclideanDistance(point, centroid));
            let closestCentroid = distances.indexOf(Math.min(...distances));
            clusters[closestCentroid].push(point);
        }

        // Step 4: Save old centroids and update the centroids
        oldCentroids = centroids;
        centroids = clusters.map((cluster) => {
            let sum = cluster.reduce((acc, point) => acc.map((p, i) => p + point[i]), [0, 0]);
            return sum.map((s) => s / cluster.length);
        });

        i++;
    }
    return clusters;
}

function kMeansPredict(data, centroids) {
    let predictions = [];
    for (let point of data) {
        let distances = centroids.map((centroid) => euclideanDistance(point, centroid));
        let closestCentroid = distances.indexOf(Math.min(...distances));
        predictions.push(closestCentroid);
    }
    return predictions;

}

function cosineSimilarity(v1, v2) {
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

function pearsonCorrelation(v1, v2) {
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