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
  programmingNotCodingLO,
  programmingSupersetLO } from "../components/introToProgramming/whatIsProgramming"

import { introTextLO,
  introLectureLO,
  designAlgoTextLO,
  designAlgoLectureLO,
  // designAlgoPseudocodeLO,
  simpleStatementImgLO,
  selectionImgLO,
  improveGameTextLO,
  improveGameLectureLO,
  // improveGamePseudocodeLO,
  ifElseImgLO,
  challengeGameExerciseLO } from "../components/introToProgramming/designGame";  

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
    compilerInterpreterLO,
    programmingNotCodingLO,
    programmingSupersetLO
]

const designGameLOs = [
    introTextLO,
    introLectureLO,
    designAlgoTextLO,
    designAlgoLectureLO,
    // designAlgoPseudocodeLO,
    simpleStatementImgLO,
    selectionImgLO,
    improveGameTextLO,
    improveGameLectureLO,
    // improveGamePseudocodeLO,
    ifElseImgLO,
    challengeGameExerciseLO
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
          description="Let's dive straight into designing a game... \n because life is too short to waste!"
         thumbnail="https://storage.googleapis.com/pleap/designGuessingGame/ifElseStatement.png" 
         learningObjects={designGameLOs} />   */}

    {generateContent && <GenerateAIContent/>}
      <button onClick={handleButtonClick}>Generate AI content</button>
    </div>
  );
};

export default AddLesson;