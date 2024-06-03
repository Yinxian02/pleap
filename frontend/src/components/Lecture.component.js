import { useState } from "react";

import { MdOutlineTextFields } from "react-icons/md";
import { BiHide } from "react-icons/bi";

import { markDownToHtml } from "./markDownToHTML";

const Lecture = ({ learningObject }) => {
    const URL = learningObject.content.link;
    const videoIdMatch = URL.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    const [showText, setShowText] = useState(false);

    const htmlText = markDownToHtml(learningObject.content.text);
    
    const showOrHideText = () => {
        setShowText(!showText);
    };

    return (
        <div className="slide">
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

            <div className="slide-footer">
                <button className="slide-button" onClick={showOrHideText}>
                    {showText ? <BiHide /> : <MdOutlineTextFields/>}
                </button>
            </div>

            {showText && (
                <div className="narrative-content" dangerouslySetInnerHTML={{ __html: htmlText }} />
            )}
        </div>
    );
};

export default Lecture;