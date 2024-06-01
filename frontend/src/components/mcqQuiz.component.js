import { useState } from "react";
import "../styles/ProfileQuiz.css";

const McqQuiz = ({questionnaire}) => {
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
    const [answerIndex, setAnswerIndex] = useState(null); 
    const [answer, setAnswer] = useState(null); 
    const [result, setResult] = useState(0); 
    const [showResult, setShowResult] = useState(false); 
    
    const currentQuestion = questionnaire[currentQuestionNum];
    const { question, choices, _id } = currentQuestion;

    const onSelectChoice = (choice, index) => {
        setAnswerIndex(index); 
        setAnswer(choice.value);
    }; 

    const onClickNext = async () => {
        setAnswerIndex(null); 
        setResult((prev) => 
            prev + answer
        );

        if (currentQuestionNum !== questionnaire.length - 1) { 
            setCurrentQuestionNum((prev) => prev + 1); 
        } else {
            setShowResult(true); 
        };
    }

    return <div className="profile-container">
        {!showResult ? (
        <>
            <span className="quiz-progress">{currentQuestionNum + 1} / {questionnaire.length} </span>
            <br />
            <h2>{question}</h2>
            <ul>
                {choices.map((choice, index) => (
                    <li
                        onClick={() => onSelectChoice(choice, index)}
                        key={choice.text}
                        className={answerIndex === index ? "selected-answer" : null}             
                    >
                        {choice.text}
                    </li>
                ))}
            </ul>
        
        <div className="footer">
            <button onClick={onClickNext} className="nextButton" disabled={answerIndex === null}>
                {currentQuestionNum === questionnaire.length - 1 ? "Finish" : "Next"}
            </button>
        </div>
        </>
        ) : (
        <div>
            Final results: {result} / {questionnaire.length}
        </div>) 
        }
    </div>
}

export default McqQuiz; 