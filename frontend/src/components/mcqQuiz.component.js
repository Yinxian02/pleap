import { useState } from "react";
// import "../styles/Quiz.css";

import { MdOutlineKeyboardArrowRight, 
        MdOutlineKeyboardDoubleArrowLeft, 
        MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

import Rating from "./Rating.component";
import '../styles/McqQuiz.css';

const McqQuiz = ({ learningObject }) => {
    const questionnaire = learningObject.content.questionnaire;

    const openAIQuestionnaire = questionnaire.openAI; 
    const vertexAIQuestionnaire = questionnaire.vertexAI;

    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
    
    const [answerIndex, setAnswerIndex] = useState(null); 
    const [answer, setAnswer] = useState(null); 

    const [result, setResult] = useState(0); 
    const [showResult, setShowResult] = useState(false); 

    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    const [selectedQuiz, setSelectedQuiz] = useState(null);

    // const currentQuestion = questionnaire[currentQuestionNum];
    const currentQuestionOpenAI = openAIQuestionnaire[currentQuestionNum];
    const currentQuestionVertexAI = vertexAIQuestionnaire[currentQuestionNum];

    // const { question, choices, _id } = currentQuestion;

    const onSelectChoice = (choice, index) => {
        setAnswerIndex(index); 
        setAnswer(choice.value);
        setCorrectAnswer(choice.value === 1);
    }; 

    const onClickPrev = async () => {
        if (currentQuestionNum !== 0) {
            setCurrentQuestionNum((prev) => prev - 1); 
        } else {
            setSelectedQuiz(null);
        }
    }

    const onClickNext = async () => {
        if (showCorrectAnswer) {
            setShowCorrectAnswer(false);  
            setAnswerIndex(null);
            setResult(prev => prev + (answer === 1 ? 1 : 0));
            if (currentQuestionNum !== openAIQuestionnaire.length - 1) {
                setCurrentQuestionNum((prev) => prev + 1);
            } else {
                setShowResult(true);
            }
            return;  
        }
        setShowCorrectAnswer(true);
    }

    return (
        <div className="mcq-div">
            <div className="mcq-header">
                <FaClipboardList className="mcq-icon"/>
                <h1 className="mcq-title">{learningObject.general.title}</h1>
                <IoSparkles className="ai-icon"/>
            </div>
            {!showResult ? (
                <>
                    <span className="quiz-progress">{currentQuestionNum + 1} / {openAIQuestionnaire.length} </span>
                    <br />
                    <br />
                    <div className="quiz-container" >
                        {selectedQuiz !== 'vertexAI' && (
                            <div className="quiz-section" onClick={() => setSelectedQuiz('openAI')}>
                                {/* <h2>OpenAI</h2> */}
                                <h3>{currentQuestionOpenAI.question}</h3>
                                <ul>
                                    {currentQuestionOpenAI.choices.map((choice, index) => (
                                        <li
                                            onClick={() => { onSelectChoice(choice, index);}}
                                            key={choice.text}
                                            className={answerIndex === index ?
                                                (showCorrectAnswer && correctAnswer !== null ?
                                                    (correctAnswer ? "correct-answer" : "incorrect-answer")
                                                    : "selected-answer")
                                                : "unselected-answer"}
                                        >
                                            {choice.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {selectedQuiz !== 'openAI' && (
                            <div className="quiz-section" onClick={() => setSelectedQuiz('vertexAI')}>
                                {/* <h2>VertexAI</h2> */}
                                <h3>{currentQuestionVertexAI.question}</h3>
                                <ul>
                                    {currentQuestionVertexAI.choices.map((choice, index) => (
                                        <li
                                            onClick={() => { onSelectChoice(choice, index)}}
                                            key={choice.text}
                                            className={answerIndex === index ?
                                                (showCorrectAnswer && correctAnswer !== null ?
                                                    (correctAnswer ? "correct-answer" : "incorrect-answer")
                                                    : "selected-answer")
                                                : "unselected-answer"}
                                        >
                                            {choice.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="footer">
                        <button onClick={onClickPrev} className="quizButton">
                            <MdOutlineKeyboardDoubleArrowLeft />
                        </button>
                        <button onClick={showCorrectAnswer ? onClickNext : () => setShowCorrectAnswer(true)} className="quizButton" disabled={answerIndex === null}>
                            {showCorrectAnswer ? <MdOutlineKeyboardDoubleArrowRight /> : <MdOutlineKeyboardArrowRight />}
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    Final results: {result} / {openAIQuestionnaire.length}
                </div>
            )}
            <Rating id={learningObject._id}/>
        </div>
    );
}

export default McqQuiz; 