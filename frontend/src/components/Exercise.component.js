import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowLeft, 
        MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoSend } from "react-icons/io5";
    
const Exercise = ({exercise}) => {
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
 
    const [userInput, setUserInput] = useState('');

    const [result, setResult] = useState(0); 
    const [showResult, setShowResult] = useState(false); 

    if (!exercise) {
        return <div> No questions available </div>
    }
    const currentQuestion = exercise[currentQuestionNum];
    const { question, answer, _id } = currentQuestion;

    const markAnswer = async () => {
        // if (userInput === answer) {
        //     setCorrectAnswer(true); 
        // } else {
        //     setCorrectAnswer(false); 
        // }
    }; 

    const handleInputChange = (e) => {
        // const newInputs = [...userInputs];
        setUserInput(e.target.value);
        // setUserInputs(newInputs);
    };

    const onClickPrev = async () => {
        if (currentQuestionNum !== 0) {
            setUserInput(''); 
            setCurrentQuestionNum((prev) => prev - 1); 
        }
    }

    const onClickNext = async () => {
        if (currentQuestionNum !== exercise.length - 1) {
            setUserInput('');  
            setCurrentQuestionNum((prev) => prev + 1);
        } 
    }

    return <div className="exercise-div">
        {!showResult ? (
        <>
            <span className="quiz-progress">{currentQuestionNum + 1} / {exercise.length} </span>
            <br/>
            <br/>
            <h2>{question}</h2>
            <br/>
            <textarea
                className="answer-text-area"
                placeholder="Enter your answer here"
                value={userInput}
                onChange={handleInputChange}
            />
            <button onClick={markAnswer} className="send-button">
                <IoSend/>
            </button>

            <div className="footer">
                <button onClick={onClickPrev} className="quizButton">
                    <MdOutlineKeyboardDoubleArrowLeft/>
                </button>
                <button onClick={onClickNext} className="quizButton" disabled={userInput === null}>
                    <MdOutlineKeyboardDoubleArrowRight/> 
                </button>
            </div>
        </>
        ) : (
        <div>
            Final results: {result} / {exercise.length}
        </div>) 
        }
    </div>
}

export default Exercise; 