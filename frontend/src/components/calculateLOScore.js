// algorithm from "A Felder and Silverman Model"
export function calculateLOScore(learningObject) {
    const LOScore = {f1: 0, f2: 0, f3: 0, f4: 0};
    const LRT = {g1: 0, g2: 0, g3: 0, g4: 0};
    const IT = {h1: 0};
    const F = {i3: 0}

    // Determine learning resource type
    switch (learningObject.educational.learningResourceType) {
        case "exercise":
        case "simulation":
        case "experiment":
            LRT.g1 = 0; 
            LRT.g2 = 0; 
            LRT.g3 = 0; 
            LRT.g4 = 0; 
            break;
        case "questionnaire":
        case "exam":
        case "problem statement":
        case "self assessment":
            LRT.g1 = 0; 
            LRT.g2 = 1; 
            LRT.g3 = 0; 
            LRT.g4 = 0; 
            break;
        case "diagram":
        case "figure":
        case "graph":
        case "table":
            LRT.g1 = 1; 
            LRT.g2 = 0; 
            LRT.g3 = 0; 
            LRT.g4 = 0; 
            break;
        case "index":
            LRT.g1 = 1; 
            LRT.g2 = 0; 
            LRT.g3 = 0; 
            LRT.g4 = 1; 
            break;
        case "slide":
            LRT.g1 = 1; 
            LRT.g2 = 1; 
            LRT.g3 = 0; 
            LRT.g4 = 0; 
            break;
        case "narrative text":
        case "lecture":
            LRT.g1 = 1; 
            LRT.g2 = 1; 
            LRT.g3 = 1; 
            LRT.g4 = 0; 
            break;
        default:
            console.log("Invalid learning resource type!");
    }

    if (learningObject.educational.interactivityType === "active") {
        IT.h1 = 0;
    } else if (learningObject.educational.interactivityType === "expositive") {
        IT.h1 =  1; 
    } else {
        IT.h1 = -1; 
    }

    if (learningObject.technical.format  === "video") {
        F.i3 = 0; 
    } else if (FMT === "expositive") {
        F.i3 = 1;
    } else {
        F.i3 = -1; 
    }

    if (interactivityType.h1 == -1) {
        LOScore.f1 = learningResourceType.g1; 
    } else {
        LOScore.f1 = learningResourceType.h1; 
    }

    LOScore.f2 = learningResourceType.g2; 

    if (interactivityType.i3 == -1) {
        LOScore.f3 = learningResourceType.g3; 
    } else {
        LOScore.f3 = learningResourceType.i3; 
    }

    LOScore.f4 = learningResourceType.g4; 

    console.log("learning object score:", LOScore);
    return LOScore; 
}