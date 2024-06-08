import { useState, useEffect, useRef } from "react";

import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { FaImages } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";

import { markDownToHtml } from "./markDownToHTML";

const NarrativeText = ({ learningObject }) => {
    const [audioOn, setAudioOn] = useState(false);
    const audioRef =  useRef(new Audio(learningObject.content.audio.vertexAI));
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

    
    const URL = learningObject.content.video;
    const videoIdMatch = URL.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    
    const showOrHideSlide = () => {
        setShowSlide(!showSlide);
    };
    
    const hasAudio = learningObject.content.audio.vertexAI !== null && learningObject.content.audio.vertexAI !== "";
    const hasVideo = learningObject.content.video !== null && learningObject.content.video !== "";
    const hasImage = learningObject.content.image !== null && learningObject.content.image !== "";
    
    let htmlText; 
    if (hasVideo) {
        htmlText = markDownToHtml(learningObject.content.transcript.vertexAI);
    } else if (hasImage) {
        htmlText = markDownToHtml(learningObject.content.description.vertexAI);
    } else {
        htmlText = markDownToHtml(learningObject.content.text);
    }

    return (
        <div className="narrative-text"> 
            { hasAudio && (
            <div className="audio-header">
                <button className="audioButton" onClick={handleButtonClick}>
                    {audioOn ? <HiMiniSpeakerXMark /> : <HiMiniSpeakerWave />}
                </button>
            </div>) }

            <div className="narrative-content" dangerouslySetInnerHTML={{ __html: htmlText }} /> 
            
            { hasImage && showSlide && (

                    <div style={{ textAlign: 'center' }}>
                        <br/>
                        <img
                            src={learningObject.content.image}
                            alt="Slide"
                            style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
                        />
                    </div>
            )}
            { hasVideo && showSlide && (
                    <div style={{ textAlign: 'center' }}>
                        <br/>
                        <iframe
                            width="500px"
                            maxWidth="100%"
                            height="315"
                            src={embedUrl}
                            title={learningObject.general.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            ></iframe>
                    </div>
            )}
            
            {( hasImage || hasVideo ) && (
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