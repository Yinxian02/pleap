import { useState } from "react";
import "../styles/Quiz.css";
import { MdOutlineKeyboardArrowRight, 
        MdOutlineKeyboardDoubleArrowLeft, 
        MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const McqQuiz = ({questionnaire}) => {
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
    
    const [answerIndex, setAnswerIndex] = useState(null); 
    const [answer, setAnswer] = useState(null); 

    const [result, setResult] = useState(0); 
    const [showResult, setShowResult] = useState(false); 

    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    const currentQuestion = questionnaire[currentQuestionNum];
    const { question, choices, _id } = currentQuestion;

    const onSelectChoice = (choice, index) => {
        setAnswerIndex(index); 
        setAnswer(choice.value);
        if (choice.value === 1) {
            setCorrectAnswer(true); 
        } else {
            setCorrectAnswer(false);
        }
    }; 

    const onClickPrev = async () => {
        if (currentQuestionNum !== 0) {
            setCurrentQuestionNum((prev) => prev - 1); 
        }
    }

    const onClickNext = async () => {
        if (showCorrectAnswer) {
            setShowCorrectAnswer(false);  
            setAnswerIndex(null);
            if (currentQuestionNum !== questionnaire.length - 1) {
                setCurrentQuestionNum((prev) => prev + 1);
            } else {
                setShowResult(true);
            }
            return;  
        }

        setAnswerIndex(null);
        setResult((prev) => prev + answer);

        if (currentQuestionNum !== questionnaire.length - 1) {
            setCurrentQuestionNum((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    }

    return <div className="mcq-div">
        {!showResult ? (
        <>
            <span className="quiz-progress">{currentQuestionNum + 1} / {questionnaire.length} </span>
            <br />
            <br />
            <h2>{question}</h2>
            <ul>
                {choices.map((choice, index) => (
                    <li
                        onClick={() => onSelectChoice(choice, index)}
                        key={choice.text}
                        className={answerIndex === index ?
                            (showCorrectAnswer && correctAnswer !== null ?
                                (correctAnswer ? "correct-answer" : "incorrect-answer")
                                : "selected-answer")
                            : null}             
                    >
                        {choice.text}
                    </li>
                ))}
            </ul>
        
        <div className="footer">
            <button onClick={onClickPrev} className="quizButton">
                <MdOutlineKeyboardDoubleArrowLeft/>
            </button>
            <button onClick={showCorrectAnswer ? onClickNext : () => setShowCorrectAnswer(true)} className="quizButton" disabled={answerIndex === null}>
                { showCorrectAnswer ? <MdOutlineKeyboardDoubleArrowRight/> : <MdOutlineKeyboardArrowRight/>}
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