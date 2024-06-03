import React from 'react';
import "../styles/Lesson.css";
import { useState } from 'react';

import LessonComponent from '../components/LessonComponent';
import GenerateAIContent from '../components/GenerateAIContent';

import { courseSummaryLO, 
  whatIsProgrammingTextLO, 
  whatIsProgrammingMentiLO, 
  whatIsProgrammingAnsLO,
  whatIsAProgramMentiLO, 
  whatIsAProgramAnsLO,
  instructingComputerTextLO,
  instructingComputerLectureLO, 
  algoFlowChartLO,
  assemblerTranslatorLO,
  byteCodeLO,
  compilerInterpreterLO,
} from "../components/introToProgramming/whatIsProgramming"

import { introTextLO,
  introLectureLO,
  designAlgoTextLO,
  designAlgoLectureLO,
  designFlowchartImgLO, 
  simpleAlgorithmImgLO,
  // designAlgoPseudocodeLO,
  selectionImgLO,
  improveGameTextLO,
  improveGameLectureLO,
  // improveGamePseudocodeLO,
  challengeGameExerciseLO } from "../components/introToProgramming/designGame";  

import {
  enrichTextLO,
  enrichLectureLO,
  repetitionImgLO,
  enrichAlgorithmImgLO,
  makeGuessingGameMoreInterestingTextLO,
  makeGuessingGameMoreInterestingLectureLO,
  makeGuessingGameMoreInterestingImg,
  improveGuessingGameChallenge
} from "../components/introToProgramming/improveGuessingGames";

const whatIsProgrammingLOs = [
    courseSummaryLO, 

    whatIsProgrammingTextLO,
    whatIsProgrammingMentiLO,
    whatIsProgrammingAnsLO, 

    whatIsAProgramMentiLO,
    whatIsAProgramAnsLO,

    instructingComputerTextLO,
    instructingComputerLectureLO,

    algoFlowChartLO,
    assemblerTranslatorLO,
    byteCodeLO,
    compilerInterpreterLO
]

const designGameLOs = [
    introTextLO,
    introLectureLO,
    designAlgoTextLO,
    designAlgoLectureLO,
    designFlowchartImgLO, 
    simpleAlgorithmImgLO,
    // designAlgoPseudocodeLO,
    selectionImgLO,
    improveGameTextLO,
    improveGameLectureLO,
    // improveGamePseudocodeLO,
    challengeGameExerciseLO
]

const improveGuessingGameLOs = [
    enrichTextLO,
    enrichLectureLO,
    repetitionImgLO,
    enrichAlgorithmImgLO,
    makeGuessingGameMoreInterestingTextLO,
    makeGuessingGameMoreInterestingLectureLO,
    makeGuessingGameMoreInterestingImg,
    improveGuessingGameChallenge
]

const AddLesson = () => {
  const [generateContent, setGenerateContent] = useState(false);

  const handleButtonClick = () => {
    setGenerateContent(true);
  };

  return (
    <div>
        {/* <LessonComponent 
        title="Intro to programming" 
        author="Josiah Wang" 
        description="Really... what exactly is programming?"
        thumbnail="https://storage.googleapis.com/pleap/whatIsProgramming/algoFlowChart.png"
       learningObjects={whatIsProgrammingLOs} />  
      
         <LessonComponent 
          title="Design a guessing game" 
          author="Josiah Wang" 
          description="Let's dive straight into designing a game... because life is too short to waste!"
         thumbnail="https://storage.googleapis.com/pleap/designGuessingGame/ifElseStatement.png" 
         learningObjects={designGameLOs} />    

        <LessonComponent
          title="Improve the guessing game"
          author="Josiah Wang"
          description="Let's make the guessing game more interesting!"
          thumbnail="https://storage.googleapis.com/pleap/improveGuessingGame/repetition.png"
          learningObjects={improveGuessingGameLOs} /> */}

    {generateContent && <GenerateAIContent/>}
      <button onClick={handleButtonClick}>Generate AI content</button>
    </div>
  );
};

export default AddLesson;