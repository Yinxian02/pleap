import { useState ,useContext, useEffect } from "react";
import { Dimension, fslsmQuiz , resultInitialState } from "./fslsmQuiz";
import "../styles/Quiz.css";
import AuthContext from '../context/AuthContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { calculateLOScore } from "./initialLORating";
import { MdOutlineKeyboardDoubleArrowLeft, 
    MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";


function calculatePreferenceScore(prev, dimension, answer) {
    if (dimension === Dimension.ActiveReflexive) {
        return answer ? {
            ...prev,
            activeReflexive: prev.activeReflexive - 1, 
        }
        : {
            ...prev,
            activeReflexive: prev.activeReflexive + 1,  
        };
    } else if (dimension === Dimension.SensingIntuitive) {
        return answer ? {
            ...prev,
            sensingIntuitive: prev.sensingIntuitive - 1, 
        }
        : {
            ...prev,
            sensingIntuitive: prev.sensingIntuitive + 1,  
        };
    } else if (dimension === Dimension.VisualVerbal) {
        return answer ? {
            ...prev,
            visualVerbal: prev.visualVerbal - 1, 
        }
        : {
            ...prev,
            visualVerbal: prev.visualVerbal + 1,  
        };
    } else if (dimension === Dimension.SequentialGlobal) {
        return answer ? {
            ...prev,
            sequentialGlobal: prev.sequentialGlobal - 1, 
        }
        : {
            ...prev,
            sequentialGlobal: prev.sequentialGlobal + 1,  
        };
    }
    ; 
}; 

function normaliseFinalPreferences(preferences) {
    for (const key in preferences) {
        // if (preferences.hasOwnProperty(key)) {
        const originalValue = preferences[key];
        const normalisedValue = (originalValue + 11) / 22;
        preferences[key] = normalisedValue;
        // }
    }

    const normalisedPreferences = {
        active: preferences.activeReflexive,
        reflexive: 1.0 - preferences.activeReflexive,
        sensing: preferences.sensingIntuitive,
        intuitive: 1.0 - preferences.sensingIntuitive,
        visual: preferences.visualVerbal,
        verbal: 1.0 - preferences.visualVerbal,
        sequential: preferences.sequentialGlobal,
        global: 1.0 - preferences.sequentialGlobal 
    };

    console.log(normalisedPreferences);
    return normalisedPreferences; 
}

const ProfileQuiz = () => {
    const { auth } = useContext(AuthContext);
    const { setAuth } = useAuthContext();

    const id = auth.id; 
    
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0); 
    const [currentDimension, setDimension] = useState(null); 
    const [answerIndex, setAnswerIndex] = useState(null); 
    const [answer, setAnswer] = useState(null); 
    const [result, setResult] = useState(resultInitialState); 
    const [showResult, setShowResult] = useState(false); 

    const { question, dimension, choices } = fslsmQuiz.questions[currentQuestionNum];

    const onSelectPreference = async (choice, index, dimension) => {
        setAnswerIndex(index); 
        setAnswer(choice.value);
        setDimension(dimension);
    }; 

    const onClickPrev = async () => {
        if (currentQuestionNum !== 0) {
            setCurrentQuestionNum((prev) => prev - 1); 
        }
    }
    const onClickNext = async () => {
        setAnswerIndex(null); 
        setResult((prev) => 
            calculatePreferenceScore(prev, currentDimension, answer)
        );

        if (currentQuestionNum !== fslsmQuiz.questions.length - 1) { 
            setCurrentQuestionNum((prev) => prev + 1); 
        } else {
            setShowResult(true); 
        };
    }

    // const calculateInitialLORatings = async () => {
    //     const response = await axios.get('http://localhost:5001/learning-objects', 
    //                                 {
    //                                     headers: { 
    //                                         'Content-Type': 'application/json',
    //                                         Authorization: 'Bearer ' + auth.accessToken,
    //                                         mode: 'cors',
    //                                         withCredentials: true,
    //                                     },
    //                                 }
    //                             );

    //     const learningObjects = response.data;

    //     const loScores = learningObjects.map(lo => calculateLOScore(lo)); 
    //     console.log(loScores);
        
        // const userPreferences = { f1: auth.preferences.active,
        //                             f2: auth.preferences.sensing, 
        //                             f3: auth.preferences.visual, 
        //                             f4: auth.preferences.sequential }

        // const loWeights = loScores.map(score => calculateLOWeight(score, userPreferences))
        // console.log(loWeights);

        // const ratings = learningObjects.map((lo, index) => ({
        //     userId: id, 
        //     learningObjectId: lo._id,
        //     rating: loWeights[index],
        // }));

        // console.log('Learning object ratings:', ratings);
        
        // try {
        //     const res = await axios.post('http://localhost:5001/ratings/addBatch', 
        //         { ratings },
        //         {
        //             headers: { 
        //                 'Content-Type': 'application/json',
        //                 Authorization: 'Bearer ' + auth.accessToken,
        //                 mode: 'cors',
        //                 withCredentials: true,
        //             },
        //         }
        //     );
        //     console.log('Learning object ratings:', res.data);
        // } catch (error) {
        //     console.error('Error rating learning objects:', error);
        // }
    // };

    const updateUserProfile = async () => {
        const preferences = normaliseFinalPreferences(result); 
        console.log('preferences:' , preferences);
        auth.preferences = preferences;
        return axios
            .post(
                `http://localhost:5001/users/update/${id}`, 
                preferences,
                {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.accessToken,
                },
                })
            .then((res) => {
                console.log(res.data);
                setAuth(auth);
            }).catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (showResult) {
            updateUserProfile()
            // .then(() => {
            //     calculateInitialLORatings(auth.preferences);
            // })
            .catch(error => {
                console.error('Error updating user profile:', error);
            });;
        }

    }, [id, auth.accessToken, result, showResult]);

    return <div className="quiz-container">
        {!showResult ? (
        <>
            <span className="quiz-progress">{currentQuestionNum + 1} / {fslsmQuiz.questions.length} </span>
            <br />
            <h2>{question}</h2>
            <ul>
                {choices.map((choice, index) => (
                    <li
                        onClick={() => onSelectPreference(choice, index, dimension)}
                        key={choice.text}
                        className={answerIndex === index ? "selected-answer" : "unselected-answer"}             
                    >
                        {choice.text}
                    </li>
                ))}
            </ul>

        <div className="footer">
            <button onClick={onClickPrev} className="quizButton">
                <MdOutlineKeyboardDoubleArrowLeft/>
            </button>
            <button onClick={onClickNext} className="quizButton" disabled={answerIndex === null}>
                <MdOutlineKeyboardDoubleArrowRight/>
            </button>
        </div>
        </>
        ) : (
            <div className="result">
                <span className="button-link">
                    <Link to="/profile">
                        <button>
                        See results.
                        </button> 
                    </Link> 
                </span> 
                
            </div>) 
        }
    </div>
}

export default ProfileQuiz; 