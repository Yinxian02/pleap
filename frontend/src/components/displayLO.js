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
    return learningObject.content.glossary !== null && learningObject.content.glossary.length > 0;
}; 

export function displayLO(learningObject) {
    // console.log(learningObject.educational.learningResourceType);
    const LRT = learningObject.educational.learningResourceType; 
    
    if (LRT === "lecture"){
        return <Lecture learningObject={learningObject} />;
    
    } else if (LRT === "slide") {
        return <Slide learningObject={learningObject} />;

    } else if (LRT === "questionnaire" && learningObject.content.aiGenerated) {
        return <McqQuiz questionnaire={learningObject.content.questionnaire}/>;
    
    } else if (LRT === "exercise" && learningObject.content.aiGenerated) {
        return <Exercise exercise={learningObject.content.exercise}/>
    
    } else if (LRT === "problem statement" && learningObject.content.aiGenerated) {
        return <Challenge challenge={learningObject.content.text}/>

    } else if (LRT === "narrative text" && isGlossary(learningObject)){
        return (<div>
                   <Glossary glossary={learningObject.content.glossary}/>
                   <Rating />
                </div>);  
    
    } else if (LRT === "narrative text"){
        return (<div>
                    <NarrativeText learningObject={learningObject} />
                    <Rating />
                </div>); 
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
            </div>
        )
    }

    if (learningObject.technical.format === "text/plain"){
        const htmlText = markDownToHtml(learningObject.content.text);
        return (
            <div dangerouslySetInnerHTML={{ __html: htmlText }} />
        );
    }
}