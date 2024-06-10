import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { generateTextResponse }  from "./generateText";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { markDownToHtml } from "./markDownToHTML";
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

    const htmlOpenAIChallenge = markDownToHtml(openAIChallenge);
    const htmlVertexAIChallenge = markDownToHtml(vertexAIChallenge);
    
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

        const htmlFeedback = markDownToHtml(response);
        setFeedback(htmlFeedback);
        setShowFeedback(true);
    }; 

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return <div className="exercise-div">
        <span>
            <BsStars className="ai-icon"/>
        </span>
        <>
        <div className="quiz-container" >
            {selectedChallenge !== 'vertexAI' && (
                <div className="quiz-section" onClick={() => setSelectedChallenge('openAI')}>
                    <div dangerouslySetInnerHTML={{ __html: htmlOpenAIChallenge }} /> 
                </div>
            )}
            {selectedChallenge !== 'openAI' && (
                <div className="quiz-section" onClick={() => setSelectedChallenge('vertexAI')}>
                    <div dangerouslySetInnerHTML={{ __html: htmlVertexAIChallenge }} /> 
                </div>
            )}
        </div>

        { selectedChallenge !== null && (
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

            {showFeedback && (
                <div dangerouslySetInnerHTML={{ __html: feedback }} /> 
            )}

        </>
        <Rating id={learningObject._id}/>
    </div>
}

export default Challenge; 