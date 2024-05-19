import React, { Component } from 'react';
import "../styles/Lesson.css";
import { Link } from 'react-router-dom';

import LearningObjectsComponent from '../components/createLesson';

import { courseSummaryLO, 
  whatIsProgrammingTextLO, 
  whatIsProgrammingMentiLO, 
  whatIsProgrammingAnsLO,
  whatIsAProgramTextLO,
  whatIsAProgramMentiLO, 
  whatIsAProgramAnsLO,
  instructingComputerTextLO,
  instructingComputerLectureLO, 
  algoFlowChartLO,
  assemblerTranslatorLO,
  byteCodeLO,
  compilerInterpreterLO,
  programmingNotCodingLO,
  programmingSupersetLO } from "../components/introToProgramming/whatIsProgramming"

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

    algoFlowChartLO,
    assemblerTranslatorLO,
    byteCodeLO,
    compilerInterpreterLO,
    programmingNotCodingLO,
    programmingSupersetLO
]


const AddLesson = () => (
  <div>
    {/* <LearningObjectsComponent learningObjects={learningObjects} /> */}
    <Link to="/lessons">
      <p>go to lessons</p>
    </Link>
  </div>
);

export default AddLesson;