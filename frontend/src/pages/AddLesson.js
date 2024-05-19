import React, { Component } from 'react';
import "../styles/Lesson.css";

import LearningObjectsComponent from '../components/createLesson';

import { courseSummaryLO, 
  whatIsProgrammingTextLO, 
  whatIsProgrammingMentiLO, 
  whatIsProgrammingAnsLO,
  whatIsAProgramTextLO,
  whatIsAProgramMentiLO, 
  whatIsAProgramAnsLO,
  instructingComputerTextLO,
  instructingComputerLectureLO } from "../components/introToProgramming/whatIsProgramming"

const learningObjects = [
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


const AddLesson = () => (
  <div>
    <LearningObjectsComponent learningObjects={learningObjects} />
  </div>
);

export default AddLesson;