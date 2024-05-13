// import React, { useState, useContext } from 'react';
import axios from 'axios';
// import validator from 'validator'

import { courseSummaryLO } from './introToProgramming/whatIsProgramming/courseSummary';

import { whatIsProgrammingTextLO } from './introToProgramming/whatIsProgramming/whatIsProgrammingText';
import { whatIsProgrammingMentiLO } from './introToProgramming/whatIsProgramming/whatIsAProgramMenti';
import { whatIsProgrammingAnsLO } from './introToProgramming/whatIsProgramming/whatIsProgrammingAns';

import { whatIsAProgramTextLO } from './introToProgramming/whatIsProgramming/whatIsAProgramText';
import { whatIsAProgramMentiLO } from './introToProgramming/whatIsProgramming/whatIsAProgramMenti';
import { whatIsAProgramAnsLO } from './introToProgramming/whatIsProgramming/whatIsAProgramAns';

import { instructingComputerTextLO } from './introToProgramming/whatIsProgramming/instructingComputerText';
import { instructingComputerLectureLO } from './introToProgramming/whatIsProgramming/instructingComputerLecture';

import { programmingSlideLO } from './introToProgramming/whatIsProgramming/programming';
import { programmingNotCodingSlideLO } from './introToProgramming/whatIsProgramming/programmingNotCoding';
import { flowSummarySlideLO } from './introToProgramming/whatIsProgramming/flowSummarySlide';
import { compilerInterpreterSlideLO } from './introToProgramming/whatIsProgramming/compilerInterpreterSlide';
import { assemblerTranslatorSlideLO } from './introToProgramming/whatIsProgramming/assemblerTranslatorSlide';

const topics = 
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

            programmingSlideLO,
            programmingNotCodingSlideLO,
            flowSummarySlideLO,
            compilerInterpreterSlideLO,
            assemblerTranslatorSlideLO
        ]
    }
    // {
    //     title: "Design a guessing game",
    //     learningObjects: [
    //         {}
    //     ]
    // }


function createLearningObjects(learningObjectsArray) {
    console.log(learningObjectsArray)
    // Iterate over each learning object in the array
    learningObjectsArray.forEach(learningObject => {
      // Make a POST request to the endpoint with the learning object data
      axios.post('http://localhost:5001/learning-objects/add', { learningObject })
        .then(res => {
          console.log(`Learning object added: ${res.data}`);
        })
        .catch(error => {
          console.error('Error adding learning object:', error);
        });
    });
  }

function createLesson(lessonTitle, lessonAuthor, lessonTopics) {
  const lesson = {
    title: lessonTitle,
    author: lessonAuthor,
    topics: lessonTopics
    }

    createLearningObjects(lessonTopics.learningObjects);

    axios
      .post(
        'http://localhost:5001/lessons/add',
        JSON.stringify({lesson}),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
            mode: 'cors',
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // Redirect to the "/admin" route after a successful submission
        // navigate('/lessons/lessons-list', { replace: true });
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });

};

createLearningObjects(topics.learningObjects);