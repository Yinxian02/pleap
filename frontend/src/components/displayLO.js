import { markDownToHtml } from "./markDownToHTML";

import Lecture from "./Lecture.component";
import Slide from "./Slide.component";
import McqQuiz from "./McqQuiz.component";
import Exercise from "./Exercise.component";
import Challenge from "./Challenge.component";
import Glossary from "./Glossary.component";
import NarrativeText from "./NarrativeText.component";
import Rating from "./Rating.component";

function isGlossary(learningObject) {
    return (learningObject.content.glossary.vertexAI !== null && learningObject.content.glossary.vertexAI.length > 0 
        || learningObject.content.glossary.openAI !== null && learningObject.content.glossary.openAI.length > 0
    );
}; 

export function displayLO(learningObject) {
    // console.log(learningObject.educational.learningResourceType);
    const LRT = learningObject.educational.learningResourceType; 
    
    if (LRT === "lecture"){
        return <div className="lo-container-div">
            <Lecture learningObject={learningObject} />
            <Rating id={learningObject._id}/>
        </div>

    } else if (LRT === "slide") {
        return <div className="lo-container-div">
            <Slide learningObject={learningObject} />
            <Rating id={learningObject._id}/>
        </div>

    } else if (LRT === "questionnaire" && learningObject.content.aiGenerated) {
        return <div className="lo-container-div">
            <McqQuiz questionnaire={learningObject.content.questionnaire}/>
            <Rating id={learningObject._id}/>
        </div>

    } else if (LRT === "exercise" && learningObject.content.aiGenerated) {
        return <div className="lo-container-div">
            <Exercise exercise={learningObject.content.exercise}/>
            <Rating id={learningObject._id}/>
        </div>
    
    } else if (LRT === "problem statement" && learningObject.content.aiGenerated) {
        return <div className="lo-container-div">
            <Challenge challenge={learningObject.content.challenge}/>
            <Rating id={learningObject._id}/>
        </div>

    } else if (LRT === "narrative text" && isGlossary(learningObject)){
        return <div className="lo-container-div">
            <Glossary glossary={learningObject.content.glossary.vertexAI}/>
            <Rating id={learningObject._id}/>
        </div>

    } else if (LRT === "narrative text" 
                || LRT === "problem statement"
                || LRT === "exercise"){
        return <div className="lo-container-div">
            <NarrativeText learningObject={learningObject} />
            <Rating id={learningObject._id}/>
        </div>
    }

    
    if (learningObject.content.embed) {
        const URL = learningObject.content.link;
        const embedCaption = learningObject.content.text ? markDownToHtml(learningObject.content.text) : "Click here to view the content";
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div dangerouslySetInnerHTML={{ __html: embedCaption }} />
                <br/>
                <iframe 
                    allowfullscreen="true" 
                    frameborder="0" 
                    height="300" 
                    src={ URL } 
                    title= {learningObject.general.title}
                    width="100%"></iframe>
                <Rating id={learningObject._id}/>
            </div>
        )
    }

    // if (learningObject.technical.format === "text/plain"){
    //     const htmlText = markDownToHtml(learningObject.content.text);
    //     return (
    //         <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    //     );
    // }
}