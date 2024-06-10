import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowLeft, 
        MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { generateTextResponse }  from "./generateText";
import { useContext } from "react";
import { parseJSON } from "./parseJSON";
import AuthContext from "../context/AuthContext";
import Rating from "./Rating.component";
import '../styles/Exercise.css';

const Exercise = ({ learningObject }) => {
    const exercise = learningObject.content.exercise;
    const openAIExercise = exercise.openAI;
    const vertexAIExercise = exercise.vertexAI;

    const { auth } = useContext(AuthContext);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
 
    const [userInput, setUserInput] = useState('');

    const [result, setResult] = useState(0); 
    const [showResult, setShowResult] = useState(false); 
    
    const [correctAnswer, setCorrectAnswer] = useState('');
    
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const currentQuestionOpenAI = openAIExercise[currentQuestionNum];
    const currentQuestionVertexAI = vertexAIExercise[currentQuestionNum];

    const [selectedExercise, setSelectedExercise] = useState(null);
    
    const markAnswer = async () => {
        let question;
        let answer;

        if (selectedExercise === "openAI") {
            question = currentQuestionOpenAI.question;
            answer = currentQuestionOpenAI.answer;
        } else if (selectedExercise === "vertexAI"){
            question = currentQuestionVertexAI.question;
            answer = currentQuestionVertexAI.answer;
        } 

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

        const response = await generateTextResponse(markPrompt, auth.accessToken, selectedExercise);
        console.log(response);

        const parsedResponse = parseJSON(response);
        setFeedback(parsedResponse.feedback);

        if (parsedResponse.isCorrect) {
            setCorrectAnswer('correct'); 
            setResult(prev => prev + 1);
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
        } else {
            setSelectedExercise(null);
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
        <span>
            <BsStars className="ai-icon"/>
        </span>
        {!showResult ? (
        <>
            <span className="quiz-progress">{currentQuestionNum + 1} / {openAIExercise.length} </span>
            <br/>
            <br/>
            <div className="quiz-container" >
                {selectedExercise !== 'vertexAI' && (
                    <div className="quiz-section" onClick={() => setSelectedExercise('openAI')}>
                        <h2>{currentQuestionOpenAI.question}</h2>
                    </div>
                )}
                {selectedExercise !== 'openAI' && (
                    <div className="quiz-section" onClick={() => setSelectedExercise('vertexAI')}>
                        <h2>{currentQuestionVertexAI.question}</h2>
                    </div>
                )}
            </div>
            
            { selectedExercise !== null && (
                <div>
                    <textarea
                        className="answer-text-area"
                        placeholder="Enter your answer here"
                        value={userInput}
                        onChange={handleInputChange}
                    /> 
                    <button onClick={markAnswer}>
                        Submit
                    </button>
                </div>
            )}


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
            Final results: {result} / {openAIExercise.length}
        </div>) 
        }
        <Rating id={learningObject._id}/>
    </div>
}

export default Exercise; 