import { markDownToHtml } from "./markDownToHTML";

import Lecture from "./Lecture.component";
import Slide from "./Slide.component";
import McqQuiz from "./McqQuiz.component";
import Exercise from "./Exercise.component";
import Challenge from "./Challenge.component";
import Glossary from "./Glossary.component";
import NarrativeText from "./NarrativeText.component";
import Rating from "./Rating.component";
import Embed from "./Embed.component";

function isGlossary(learningObject) {
    return (learningObject.content.glossary.vertexAI !== null && learningObject.content.glossary.vertexAI.length > 0 
        || learningObject.content.glossary.openAI !== null && learningObject.content.glossary.openAI.length > 0
    );
}; 

export function displayLO(learningObject) {
    // console.log(learningObject.educational.learningResourceType);
    const LRT = learningObject.educational.learningResourceType; 
    
    if (LRT === "lecture"){
        return <Lecture learningObject={learningObject} />

    } else if (LRT === "slide") {
        return <Slide learningObject={learningObject} />

    } else if (LRT === "questionnaire" && learningObject.content.aiGenerated) {
        return <McqQuiz learningObject={learningObject} />

    } else if (LRT === "exercise" && learningObject.content.aiGenerated) {
        return <Exercise learningObject={learningObject}/>
    
    } else if (LRT === "problem statement" && learningObject.content.aiGenerated) {
        return <Challenge learningObject={learningObject}/>

    } else if (LRT === "narrative text" && isGlossary(learningObject)){
        return <Glossary learningObject={learningObject}/>

    } else if (LRT === "narrative text" 
                || LRT === "problem statement"
                || LRT === "exercise"){
        return <NarrativeText learningObject={learningObject} />
    }

    
    if (learningObject.content.embed) {
        return <Embed learningObject={learningObject} />
    }
}