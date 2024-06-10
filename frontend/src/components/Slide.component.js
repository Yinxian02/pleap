import { useState, useEffect, useRef } from "react";

import { MdContentPaste } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { CgTranscript } from "react-icons/cg";
import { MdOutlineTextFields } from "react-icons/md";
import { BiHide } from "react-icons/bi";

import { markDownToHtml } from "./markDownToHTML";
import Rating from "./Rating.component";
import '../styles/Slide.css';

const Slide = ({ learningObject }) => {
    const audioRef =  useRef(new Audio(learningObject.content.audio));
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
        };
    }, []);

    const htmlText = markDownToHtml(learningObject.content.description.vertexAI);

    const showSlide = () => {
        setShowText(false);
    }

    const showDescription = () => {
        setShowText(true);
    }

    return (
        <div className="slide-div">

            <div className="slide-header">
                <div className="slide-toggle">
                    <button className={`slide-button ${!showText ? 'active' : ''}`} onClick={showSlide}>
                        <GoVideo />
                    </button>
                    <button className={`slide-button ${showText ? 'active' : ''}`} onClick={showDescription}>
                        <CgTranscript />
                    </button>
                </div>
            </div>

            <div className="slide-title-container">
                <MdContentPaste className="slide-icon"/>
                <h1 className="slide-title">{learningObject.general.title}</h1>
            </div>

            {!showText && <img
                    src={learningObject.content.image}
                    alt="Slide"
                    className="slide-image"/>}

            {showText && (
                <div className="narrative-text" dangerouslySetInnerHTML={{ __html: htmlText }} />
            )}

            <Rating id={learningObject._id}/>
        </div>
    );
};

export default Slide;