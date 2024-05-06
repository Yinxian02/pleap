// algorithm from "A Felder and Silverman Model"
export function calculateLOWeight(learningObjectScore, learningPreferences) {

    const weight = 0;

    // Calculate pairwise differences and sum them up
    for (const key in learningObjectScore) {
        weight += Math.abs(learningObjectScore[key] - learningPreferences[key]);
    }

    console.log("learning object weight:", weight);
    return weight; 
}