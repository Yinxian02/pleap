import { useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { generateTextResponse }  from "./generateText";
import { useContext } from "react";
import { parseJSON } from "./parseJSON";
import AuthContext from "../context/AuthContext";
import Rating from "./Rating.component";
import '../styles/Exercise.css';
import { markDownToHtml } from "./markDownToHTML";

const Exercise = ({ learningObject }) => {
    const exercise = learningObject.content.exercise;
    const openAIExercise = exercise.openAI;
    const vertexAIExercise = exercise.vertexAI;

    const { auth } = useContext(AuthContext);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
 
    const [userInput, setUserInput] = useState('');

    const [result, setResult] = useState(0); 
    const [showResult, setShowResult] = useState(false); 
    
    const [correctAnswer, setCorrectAnswer] = useState(null);
    
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    // const currentQuestionOpenAI = openAIExercise[currentQuestionNum];
    const currentQuestionVertexAI = vertexAIExercise[currentQuestionNum];

    // const [selectedExercise, setSelectedExercise] = useState(null);
    
    const selectedExercise = 'vertexAI';

    const markAnswer = async () => {

        let question;
        let answer;

        // if (selectedExercise === "openAI") {
        //     question = currentQuestionOpenAI.question;
        //     answer = currentQuestionOpenAI.answer;
        // } else if (selectedExercise === "vertexAI"){
            question = currentQuestionVertexAI.question;
            answer = currentQuestionVertexAI.answer;
        // } 

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
        const feedbackMarkdown = markDownToHtml(parsedResponse.feedback);
        setFeedback(feedbackMarkdown);

        if (parsedResponse.isCorrect) {
            setCorrectAnswer(true); 
            setResult(prev => prev + 1);
        } else {
            setCorrectAnswer(false); 
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
            setCorrectAnswer(null);
        } else {
            // setSelectedExercise(null);
        }
    }

    const onClickNext = async () => {
        if (currentQuestionNum !== vertexAIExercise.length - 1) {
            setUserInput(''); 
            setFeedback(''); 
            setShowFeedback(false);
            setCurrentQuestionNum((prev) => prev + 1);
            setCorrectAnswer(null);
        } else {
            setShowResult(true);
        }
    }

    return <div className="exercise-div">
        <div className="exercise-header">
            <MdOutlineQuiz className="exercise-icon"/>
            <h1 className="exercise-title">{learningObject.general.title}</h1>
            <IoSparkles className="ai-icon"/>
        </div>
        {!showResult ? (
        <>
            <span className="exercise-number-progress">{currentQuestionNum + 1} / {vertexAIExercise.length} </span>
            <br/>
            <br/>
            {/* <div className="exercise-container"> */}
                {/* {selectedExercise !== 'vertexAI' && (
                    <div className="quiz-section" onClick={() => setSelectedExercise('openAI')}>
                        <h2>{currentQuestionOpenAI.question}</h2>
                    </div>
                )} */}
                {/* {selectedExercise !== 'openAI' && ( */}
            <div className="exercise-section">
                <h2>{currentQuestionVertexAI.question}</h2>
                    
                {/* )} */}
            {/* </div> */}
            
            {/* { selectedExercise !== null && ( */}
                <div className="answer-text-container">
                <textarea
                    className={`answer-text-area ${correctAnswer === null ? '' : correctAnswer ? 'correct-text-area' : 'incorrect-text-area'}`}
                    placeholder="Enter your answer here"
                    value={userInput}
                    onChange={handleInputChange}
                />
                </div>
            {/* )} */}


            {/* <br/><br/> */}

            { showFeedback && (
                <div className={`${ (correctAnswer === null) 
                                    ? '' : ( correctAnswer ?
                                    'correct-quiz-answer' : 'incorrect-quiz-answer')}`}>
                    {feedback}
                </div>
            )} 

            { showFeedback && (
                <div className="next-footer">
                    <button onClick={onClickPrev} className="quizButton">
                        Prev
                    </button>
                    <button onClick={onClickNext} className="quizButton">
                        Next
                    </button>
                </div>
            )}
            </div>
            
            { !showFeedback && (
                <div className="next-footer">
                    <button onClick={markAnswer}>
                        Submit
                    </button>
                </div>
            )}
        </>
        ) : (
        <div className="results-container">
            Score: 
            <div className="exercise-score">{result}/{vertexAIExercise.length}</div>
            Good job! You may now continue to the next section.
        </div>
        ) 
        }
        <Rating id={learningObject._id}/>
    </div>
}

export default Exercise; 