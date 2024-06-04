import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowLeft, 
        MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { generateTextResponse }  from "./generateText";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Exercise = ({exercise}) => {
    const { auth } = useContext(AuthContext);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
 
    const [userInput, setUserInput] = useState('');

    const [result, setResult] = useState(0); 
    const [showResult, setShowResult] = useState(false); 
    
    const [correctAnswer, setCorrectAnswer] = useState('');
    
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    if (!exercise) {
        return <div> No questions available </div>
    }
    const currentQuestion = exercise[currentQuestionNum];
    const { question, answer, _id } = currentQuestion;

    const markAnswer = async () => {
        const markPrompt = `You are an intelligent grading assistant. 
        Your task is to evaluate the provided user input based on the given question and the correct answer. 
        Please mark the user's answer as either correct or incorrect,
        and provide detailed feedback on the user's answer.

        Question: ${question}
        Correct Answer: ${answer}
        User Input: ${userInput}
        
        Please provide your evaluation in the following JSON format:
        {
          "isCorrect": true/false,
          "feedback": "..."
        }
        `; 
        console.log(markPrompt);

        const response = await generateTextResponse(markPrompt, auth.accessToken);
        console.log(response);
        const parsedResponse = JSON.parse(response);
        setFeedback(parsedResponse.feedback);

        if (parsedResponse.isCorrect) {
            setCorrectAnswer('correct'); 
            setResult(result + 1);
        } else {
            setCorrectAnswer('incorrect'); 
        }
        setShowFeedback(true);
    }; 

    const handleInputChange = (e) => {
        // const newInputs = [...userInputs];
        setUserInput(e.target.value);
        // setUserInputs(newInputs);
    };

    const onClickPrev = async () => {
        if (currentQuestionNum !== 0) {
            setUserInput(''); 
            setFeedback('');
            setCurrentQuestionNum((prev) => prev - 1); 
            setCorrectAnswer('none');
        }
    }

    const onClickNext = async () => {
        if (currentQuestionNum !== exercise.length - 1) {
            setUserInput(''); 
            setFeedback(''); 
            setCurrentQuestionNum((prev) => prev + 1);
            setCorrectAnswer('none');
        } else {
            setShowResult(true);
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
            <button onClick={markAnswer} className="send-button slide-button">
                <IoSend/>
            </button>

            <br/><br/>

            { showFeedback && (
                <div className={`${ (correctAnswer === 'none') 
                                    ? '' : ((correctAnswer === 'correct') ?
                                    'correct-quiz-answer' : 'incorrect-quiz-answer')}`}>
                    {feedback}
                </div>
            )}

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