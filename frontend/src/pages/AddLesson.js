import React from 'react';
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

import { introTextLO,
  introLectureLO,
  designAlgoTextLO,
  designAlgoLectureLO,
  designAlgoPseudocodeLO,
  simpleStatementImgLO,
  selectionImgLO,
  improveGameTextLO,
  improveGameLectureLO,
  improveGamePseudocodeLO,
  ifElseImgLO,
  challengeGameExerciseLO } from "../components/introToProgramming/designGame";  

const whatIsProgrammingLOs = [
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

const designGameLOs = [
    introTextLO,
    introLectureLO,
    designAlgoTextLO,
    designAlgoLectureLO,
    designAlgoPseudocodeLO,
    simpleStatementImgLO,
    selectionImgLO,
    improveGameTextLO,
    improveGameLectureLO,
    improveGamePseudocodeLO,
    ifElseImgLO,
    challengeGameExerciseLO
]


const AddLesson = () => (
  <div>
    <LearningObjectsComponent title="Intro to programming" author="Josiah Wang" learningObjects={whatIsProgrammingLOs} />
    <LearningObjectsComponent title="Design a guessing game" author="Josiah Wang" learningObjects={designGameLOs} />
    <Link to="/lessons">
      <p>go to lessons</p>
    </Link>
  </div>
);

export default AddLesson;