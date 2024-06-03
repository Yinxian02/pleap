import { useState, useEffect, useRef } from "react";

import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { FaImages } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";

import { markDownToHtml } from "./markDownToHTML";

const NarrativeText = ({ learningObject }) => {
    const [audioOn, setAudioOn] = useState(false);
    const audioRef =  useRef(new Audio(learningObject.content.audio));
    const [showSlide, setShowSlide] = useState(false);

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
    
    const showOrHideSlide = () => {
        setShowSlide(!showSlide);
    };

    return (
        <div className="narrative-text">
            <div className="audio-header">
                <button className="audioButton" onClick={handleButtonClick}>
                    {audioOn ? <HiMiniSpeakerXMark /> : <HiMiniSpeakerWave />}
                </button>
            </div>
            <div className="narrative-content" dangerouslySetInnerHTML={{ __html: htmlText }} />
            {showSlide && (
                <div style={{ textAlign: 'center' }}>
                    <br/>
                    <img
                        src={learningObject.content.link}
                        alt="Slide"
                        style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
                    />
            </div>
            )}
            {learningObject.content.link !== null && learningObject.content.link !== "" && (
                <div className="slide-footer">
                    <button className="slide-button" onClick={showOrHideSlide}>
                        {showSlide ? <BiHide /> : <FaImages />}
                    </button>
                </div>
            )}
        </div>
    );
};

export default NarrativeText;