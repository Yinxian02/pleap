import { useState, useEffect, useRef } from "react";

import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { MdOutlineTextFields } from "react-icons/md";
import { BiHide } from "react-icons/bi";

import { markDownToHtml } from "./markDownToHTML";

const Slide = ({ learningObject }) => {
    const [audioOn, setAudioOn] = useState(false);
    const audioRef =  useRef(new Audio(learningObject.content.audio));
    const [showText, setShowText] = useState(false);

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
    
    const showOrHideText = () => {
        setShowText(!showText);
    };

    return (
        <div className="slide">
            <div style={{ textAlign: 'center' }}>
                <br/>
                <img
                    src={learningObject.content.link}
                    alt="Slide"
                    style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
                />
            </div>

            <div className="slide-footer">
                <button className="slide-button" onClick={showOrHideText}>
                    {showText ? <BiHide /> : <MdOutlineTextFields/>}
                </button>
            </div>

            {showText && (
                <div>
                    <div className="audio-header">
                        <button className="audioButton" onClick={handleButtonClick}>
                            {audioOn ? <HiMiniSpeakerXMark /> : <HiMiniSpeakerWave />}
                        </button>
                    </div>
                    <div className="narrative-content" dangerouslySetInnerHTML={{ __html: htmlText }} />
            </div>
            )}
        </div>
    );
};

export default Slide;