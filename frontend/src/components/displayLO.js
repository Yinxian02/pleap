import McqQuiz from "./mcqQuiz.component";

function markDownToHtml(markdown) {
    const html = markdown
        .replace(/(?:\r\n|\r|\n)/g, '<br>')
        .replace(/(?:\*\*)(.*?)(?:\*\*)/g, '<strong>$1</strong>')
        .replace(/(?:\*)(.*?)(?:\*)/g, '<em>$1</em>')
        // .replace(/(?:\~\~)(.*?)(?:\~\~)/g, '<del>$1</del>')
        // .replace(/(?:\`)(.*?)(?:\`)/g, '<code>$1</code>')
        // .replace(/(?:\[(.*?)\]\((.*?)\))/g, '<a href="$2" target="_blank">$1</a>');
    // console.log(html);
    return html;
}

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
                width="600px"
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

    // const sanitizedText = DOMPurify.sanitize(learningObject.content.text);
    
    if (learningObject.technical.format === "text/plain"){
        const htmlText = markDownToHtml(learningObject.content.text);
        return (
            <div dangerouslySetInnerHTML={{ __html: htmlText }} />
        );
    }
}