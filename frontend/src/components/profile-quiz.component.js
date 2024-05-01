import { useState ,useContext } from "react";
import { Dimension, fslsmQuiz , resultInitialState } from "./fslsmQuiz"; 
import { useParams } from 'react-router-dom';
import "../styles/ProfileQuiz.css";
import AuthContext from '../context/AuthContext';
import axios from 'axios';

function calculatePreferenceScore(prev, dimension, answer) {
    if (dimension === Dimension.ActiveReflexive) {
        return answer ? {
            ...prev,
            activeReflexive: prev.activeReflexive + 1, 
        }
        : {
            ...prev,
            activeReflexive: prev.activeReflexive - 1,  
        };
    } else if (dimension === Dimension.SensingIntuitive) {
        return answer ? {
            ...prev,
            sensingIntuitive: prev.sensingIntuitive + 1, 
        }
        : {
            ...prev,
            sensingIntuitive: prev.sensingIntuitive - 1,  
        };
    } else if (dimension === Dimension.VisualVerbal) {
        return answer ? {
            ...prev,
            visualVerbal: prev.visualVerbal + 1, 
        }
        : {
            ...prev,
            visualVerbal: prev.visualVerbal - 1,  
        };
    } else if (dimension === Dimension.SequentialGlobal) {
        return answer ? {
            ...prev,
            sequentialGlobal: prev.sequentialGlobal + 1, 
        }
        : {
            ...prev,
            sequentialGlobal: prev.sequentialGlobal - 1,  
        };
    }
    ; 
}; 

const ProfileQuiz = () => {
    // const { auth } = useContext(AuthContext);
    // const { id } = useParams();
    // console.log(auth); 

    // const [user, setUser] = useState({
    //     email: '',
    //     user: '',
    //     learningPreferences: '',
    //   });
    
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
    const [currentDimension, setDimension] = useState(null); 
    const [answerIndex, setAnswerIndex] = useState(null); 
    const [answer, setAnswer] = useState(null); 
    const [result, setResult] = useState(resultInitialState); 
    const [showResult, setShowResult] = useState(false); 

    const { question, dimension, choices } = fslsmQuiz.questions[currentQuestionNum];

    const onSelectPreference = (choice, index, dimension) => {
        setAnswerIndex(index); 
        setAnswer(choice.value);
        setDimension(dimension);
    }; 


    const onClickNext = async () => {
        setAnswerIndex(null); 
        setResult((prev) => 
            
            calculatePreferenceScore(prev, currentDimension, answer)
        );

        if (currentQuestionNum !== fslsmQuiz.questions.length - 1) { 
            setCurrentQuestionNum((prev) => prev + 1); 
        } else {
            setCurrentQuestionNum(0); 
            setShowResult(true); 
            console.log(result); 
        }
    }; 

    return <div className="quiz-container">
        {!showResult ? (

        <>
            <span className="quiz-progress">{currentQuestionNum + 1} / {fslsmQuiz.questions.length} </span>
            <br />
            <h2>{question}</h2>
            <ul>
                {choices.map((choice, index) => (
                    <li
                        onClick={() => onSelectPreference(choice, index, dimension)}
                        key={choice.text}
                        className={answerIndex === index ? "selected-answer" : null}             
                    >
                        {choice.text}
                    </li>
                ))}
            </ul>
        
        <div className="footer">
            <button onClick={onClickNext} className="nextButton" disabled={answerIndex === null}>
                {currentQuestionNum === fslsmQuiz.questions.length - 1 ? "Finish" : "Next"}
            </button>
        </div>
        </>
        ) : (
            <div className="result">
                <h3> Result </h3> 
                <p> 
                    Active Reflexive: <span>{result.activeReflexive}</span>
                    <br/>
                    Sensing Reflexive: <span>{result.sensingIntuitive}</span>
                    <br/>
                    Visual Verbal: <span>{result.visualVerbal}</span>
                    <br/>
                    Sequential Global: <span>{result.sequentialGlobal}</span>
                    <br/>

                </p>
                
            </div>) 
        }
    </div>
}

export default ProfileQuiz; 