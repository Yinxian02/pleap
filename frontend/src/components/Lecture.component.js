import { useState } from "react";

import { MdContentPaste } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { CgTranscript } from "react-icons/cg";
import { MdLightbulbOutline } from "react-icons/md";

import { markDownToHtml } from "./markDownToHTML";
import Rating from "./Rating.component";
import '../styles/Lecture.css';

const Lecture = ({ learningObject }) => {
    const URL = learningObject.content.video;
    const videoIdMatch = URL.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    const [showText, setShowText] = useState(false);

    const htmlText = markDownToHtml(learningObject.content.transcript.openAI);


    const showLecture = () => {
        setShowText(false);
    }

    const showTranscript = () => {
        setShowText(true);
    }

    return (
        <div className="lecture-div">
            
            <div className="lecture-header">
                <div className={`lecture-toggle ${showText ? 'active' : ''}`}>
                    <button className={`lecture-button ${!showText ? 'active' : ''}`} onClick={showLecture}>
                        <GoVideo />
                    </button>
                    <button className={`lecture-button ${showText ? 'active' : ''}`} onClick={showTranscript}>
                        <CgTranscript />
                    </button>
                </div>
            </div>

            <div className="lecture-title-container">
                <MdContentPaste className="lecture-icon"/>
                <h1 className="lecture-title">{learningObject.general.title}</h1>
            </div>
            

            {!showText && <iframe
                src={embedUrl}
                title={learningObject.general.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="lecture-embed-frame"
            ></iframe>}

            {showText && (
                <>
                    <div className="ai-options">
                        < MdLightbulbOutline className="lightbulb"/>
                        <p className='ai-options-text'>This lecture transcript is generated by AI.</p>
                    </div>
                    <div className="narrative-text-lecture" dangerouslySetInnerHTML={{ __html: htmlText }} />
                </>
            )}
            <Rating id={learningObject._id}/>
        </div>
    );
};

export default Lecture;