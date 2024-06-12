import React, { useState } from 'react';
import '../styles/Glossary.css'; 
import { FlashcardArray } from 'react-quizlet-flashcard';
import { FaTableList } from "react-icons/fa6";
import { PiCards } from "react-icons/pi";
import Rating from './Rating.component';

const Glossary = ({ learningObject }) => {
    const glossary = learningObject.content.glossary.vertexAI;
    // console.log(glossary);
    const [view, setView] = useState('table');

    const toggleView = () => {
        setView(view === 'table' ? 'flashcards' : 'table');
    };

    return (
        <div className="glossary-div">
            {view === 'table' ? (
                <div>
                    {glossary.map((item, index) => (
                        <div key={index} className="glossary-item">
                            <div className="glossary-term">{item.term}</div>
                            <div className="glossary-definition">{item.definition}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <FlashcardArray 
                    cards={glossary.map((item) => ({
                        frontHTML: item.term,
                        backHTML: item.definition,
                    }))} 
                    frontContentStyle={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    backContentStyle={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}/>
            )}
            {/* <div className='toggle-header'> */}
                <button onClick={toggleView} className="toggle-button">
                    {view === 'table' ? <PiCards/> : <FaTableList/>}
                </button>
            {/* </div> */}
            <Rating id={learningObject._id}/>
        </div>
    );
}

export default Glossary; 