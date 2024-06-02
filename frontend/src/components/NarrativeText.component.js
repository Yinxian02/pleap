import { useState, useEffect, useRef } from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { markDownToHtml } from "./markDownToHTML";

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

export default NarrativeText