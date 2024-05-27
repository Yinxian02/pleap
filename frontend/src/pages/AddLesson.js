import React from 'react';
import "../styles/Lesson.css";
import { Link } from 'react-router-dom';

import LearningObjectsComponent from '../components/createLesson';
import GenerateAIContent from '../components/generateAIContent'
// import createMCQ from '../components/createMCQ';

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
    {/* <LearningObjectsComponent 
        title="Intro to programming" 
        author="Josiah Wang" 
        description="Really... what exactly is programming?"
        thumbnail="https://storage.googleapis.com/pleap/whatIsProgramming/algoFlowChart.png"
        learningObjects={whatIsProgrammingLOs} />
    
    <LearningObjectsComponent 
        title="Design a guessing game" 
        author="Josiah Wang" 
        description="Let's dive straight into designing a game... because life is too short to waste!"
        thumbnail="https://storage.googleapis.com/pleap/designGuessingGame/ifElseStatement.png"
        learningObjects={designGameLOs} /> */}
    
    <GenerateAIContent/>

    <Link to="/lessons">
      <p>go to lessons</p>
    </Link>
  </div>
);

export default AddLesson;