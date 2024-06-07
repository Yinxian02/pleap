import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { generateTextResponse }  from "./generateText";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { markDownToHtml } from "./markDownToHTML";

const Challenge = ({challenge}) => {
    const { auth } = useContext(AuthContext);
 
    const [userInput, setUserInput] = useState('');
    
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const htmlChallenge = markDownToHtml(challenge);
    
    const markAnswer = async () => {
        const markPrompt = `You are an intelligent grading assistant. 
        Your task is to evaluate the provided user input based on the given question and the correct answer. 
        Please provide detailed feedback on the user's answer.

        Question: ${challenge}
        User Input: ${userInput}`; 
        // console.log(markPrompt);

        const response = await generateTextResponse(markPrompt, auth.accessToken);
        console.log(response);

        const htmlFeedback = markDownToHtml(response);
        setFeedback(htmlFeedback);

        setShowFeedback(true);
    }; 

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return <div className="exercise-div">
        <>
        <div dangerouslySetInnerHTML={{ __html: htmlChallenge }} /> 
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

            {showFeedback && (
                <div dangerouslySetInnerHTML={{ __html: feedback }} /> 
            )}
        </>
    </div>
}

export default Challenge; 