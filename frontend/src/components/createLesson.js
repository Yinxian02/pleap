import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { LearningObject } from "./learningObject";

import { courseSummaryLO, 
    whatIsProgrammingTextLO, 
    whatIsProgrammingMentiLO, 
    whatIsProgrammingAnsLO,
    whatIsAProgramTextLO,
    whatIsAProgramMentiLO, 
    whatIsAProgramAnsLO,
    instructingComputerTextLO,
    instructingComputerLectureLO } from './introToProgramming/whatIsProgramming'; 

const lesson = 
    { 
        title: "What is programming",
        learningObjects: [
            courseSummaryLO, 

            whatIsProgrammingTextLO,
            whatIsProgrammingMentiLO,
            whatIsProgrammingAnsLO, 

            whatIsAProgramTextLO,
            whatIsAProgramMentiLO,
            whatIsAProgramAnsLO,

            instructingComputerTextLO,
            instructingComputerLectureLO,
        ]
    }
    // {
    //     title: "Design a guessing game",
    //     learningObjects: [
            
    //     ]
    // }
  


export default function CreateLearningObjects() {
    const { auth } = useContext(AuthContext);
    console.log(lesson.learningObjects)
    axios.
      post('http://localhost:5001/learning-objects/addBatch', 
          ({learningObjects: lesson.learningObjects}),
          {
            headers: { 
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          })
      .then(res => {
        console.log(`Learning objects added: ${res.data}`);
      })
      .catch(error => {
        console.error('Error adding learning objects:', error);
      });
  }

// function createLesson(lessonTitle, lessonAuthor, lessonTopics) {
//   const lesson = {
//     title: lessonTitle,
//     author: lessonAuthor,
//     topics: lessonTopics
//     }

//     createLearningObjects(lessonTopics.learningObjects);

//     axios
//       .post(
//         'http://localhost:5001/lessons/add',
//         JSON.stringify({lesson}),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + auth.accessToken,
//             mode: 'cors',
//             withCredentials: true,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data);
//         // Redirect to the "/admin" route after a successful submission
//         // navigate('/lessons/lessons-list', { replace: true });
//       })
//       .catch((error) => {
//         // Handle errors here
//         console.error(error);
//       });

// };
