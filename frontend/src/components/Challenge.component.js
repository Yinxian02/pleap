import { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { generateTextResponse }  from "./generateText";
import { MdLightbulbOutline } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import '../styles/Challenge.css';
import { markDownAIToHtml } from "./markDownToHTML";
import { parseJSON } from "./parseJSON";
import Rating from "./Rating.component";

const Challenge = ({ learningObject }) => {
    const challenge = learningObject.content.challenge;
    const openAIChallenge = challenge.openAI;
    const vertexAIChallenge = challenge.vertexAI;

    const { auth } = useContext(AuthContext);
 
    const [userInput, setUserInput] = useState('');
    
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const htmlOpenAIChallenge = markDownAIToHtml(openAIChallenge);
    const htmlVertexAIChallenge = markDownAIToHtml(vertexAIChallenge);
    
    const markAnswer = async () => {
        let challenge;

        if (selectedChallenge === "openAI") {
            challenge = openAIChallenge;
        } else if (selectedChallenge === "vertexAI"){
            challenge = vertexAIChallenge;
        }

        const markPrompt = `You are an intelligent grading assistant. 
        Your task is to evaluate the provided user input based on the given question and the correct answer. 
        Please provide detailed feedback on the user's answer.

        Question: ${challenge}
        User Input: ${userInput}`; 
        // console.log(markPrompt);

        const response = await generateTextResponse(markPrompt, auth.accessToken, selectedChallenge);
        console.log(response);

        const parsedResponse = parseJSON(response);
        const feedbackMarkdown = markDownAIToHtml(parsedResponse.feedback);
        setFeedback(feedbackMarkdown);
        setShowFeedback(true);
    }; 

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return <div className="challenge-div">
        <div className="challenge-header">
            <FaRegLightbulb className="challenge-icon"/>
            <h1 className="challenge-title">{learningObject.general.title}</h1>
            <IoSparkles className="ai-icon"/>
        </div>

        <div className="ai-options">
            < MdLightbulbOutline className="lightbulb"/>
            <p className='ai-options-text'>Choose the challenge you would like to tackle.</p>
        </div>
        <>
        <div className="challenge-container" >
            {selectedChallenge !== 'vertexAI' && (
                <div className={`${selectedChallenge === null ? "challenge-choices": "challenge-section"}`} onClick={() => setSelectedChallenge('openAI')}>
                    <p dangerouslySetInnerHTML={{ __html: htmlOpenAIChallenge }} /> 
                </div>
            )}
            {selectedChallenge !== 'openAI' && (
                <div className={`${selectedChallenge === null ? "challenge-choices": "challenge-section"}`}  onClick={() => setSelectedChallenge('vertexAI')}>
                    <p dangerouslySetInnerHTML={{ __html: htmlVertexAIChallenge }} /> 
                </div>
            )}
        </div>

        { selectedChallenge !== null && (
                <div className="answer-text-container">
                    <textarea
                        className="answer-text-area"
                        placeholder="Enter your answer here"
                        value={userInput}
                        onChange={handleInputChange}
                    /> 
                    {/* <button onClick={markAnswer}>
                        Submit
                    </button> */}
                </div>
            )}
        

            {/* <br/><br/> */}

            { showFeedback && (
                <div dangerouslySetInnerHTML={{ __html: feedback }} /> 
            )}
            {  selectedChallenge !== null && !showFeedback && (
                <div className="next-footer">
                    <button onClick={markAnswer}>
                        Submit
                    </button>
                </div>
            )}

        </>
        <Rating id={learningObject._id}/>
    </div>
}

export default Challenge; 