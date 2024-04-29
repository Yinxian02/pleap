import { useState } from "react";
import { fslsmQuiz } from "./fslsmQuiz"; 

const ProfileQuiz = () => {
    const [currentQuestion , setCurrentQuestion] = useState(0); 
    const {question, choices} = fslsmQuiz.questions[currentQuestion];

    return <div className="quiz-container">
        <>
            <span className="current-question-num">{currentQuestion + 1}</span>
            <span className="total-question">{fslsmQuiz.questions.length}</span>
            <h2>{question}</h2>
        </>
    </div>
}

export default ProfileQuiz; 