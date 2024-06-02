import { markDownToHtml } from "./markDownToHTML";
import McqQuiz from "./McqQuiz.component";
import NarrativeText from "./NarrativeText.component";

export function displayLO(learningObject) {
    const LRT = learningObject.educational.learningResourceType; 
    const URL = learningObject.content.link;
    // const htmlText = markDownToHtml(learningObject.content.text);
    
    if (LRT === "lecture"){
        const videoIdMatch = URL.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        return (
            <div style={{ textAlign: 'center' }}>
              <iframe
                width="500px"
                maxWidth="100%"
                height="315"
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
          );
    } else if (LRT === "slide") {
        return (
            <div style={{ textAlign: 'center' }}>
                <img
                src={ URL }
                alt="Slide"
                style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
                />
            </div>
        );
    } else if (LRT === "questionnaire" && learningObject.content.aiGenerated) {
        console.log(learningObject._id);
        return (
            <div>
                <McqQuiz questionnaire={learningObject.content.questionnaire} />
            </div>
        );
    } else if (LRT === "exercise" && learningObject.content.aiGenerated) {
        return (
            <div>
                hi
                {/* <h3>{learningObject.content.question}</h3>
                <p>{learningObject.content.text}</p> */}
            </div>
        );
    } else if (LRT === "narrative text"){
        return <NarrativeText learningObject={learningObject} />;
    }
    
    if (learningObject.content.embed) {
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