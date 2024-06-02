import McqQuiz from "./mcqQuiz.component";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";

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

const NarrativeText = ({ learningObject }) => {
    const [audioOn, setAudioOn] = useState(false);
    const audioRef =  useRef(new Audio(learningObject.content.audio));

    const handleButtonClick = () => {
        if (audioOn) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();

        }
        setAudioOn(!audioOn);
    };

    useEffect(() => {
        return () => {
            audioRef.current.pause();
        };
    }, []);

    const htmlText = markDownToHtml(learningObject.content.text);

    return (
        <div className="narrative-text">
            <div className="audio-header">
                <button className="audioButton" onClick={handleButtonClick}>
                    {audioOn ? <HiMiniSpeakerXMark /> : <HiMiniSpeakerWave />}
                </button>
            </div>
            <div className="narrative-content" dangerouslySetInnerHTML={{ __html: htmlText }} />
        </div>
    );
};

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
    } else if (LRT === "narrative text"){
        return <NarrativeText learningObject={learningObject} />;
        // const htmlText = markDownToHtml(learningObject.content.text);
        
        // const audioOn = false;
        // const audio = new Audio(learningObject.content.audio);

        // const handleButtonClick = () => {
        //     if (audioOn) {
        //         audio.pause();
        //         audioOn = false;
        //     } else {
        //         audio.play();
        //         audioOn = true;
        //     }
        // };

        // return (
        //     <div className="narrative-text">
        //         <div className="audio-header">
        //             <button className="audioButton" onClick={handleButtonClick}>
        //                 <HiMiniSpeakerWave/>
        //             </button>
        //         </div>
        //         <div className dangerouslySetInnerHTML={{ __html: htmlText }} />
        //     </div>
        // );
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