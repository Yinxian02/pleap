import { LearningObject } from "../learningObject";

const courseSummaryObj = new LearningObject("Introduction to Course", "text/plain", "expositive", "problem statement", "low");
const courseSummaryText = `In this lesson, I will be presenting programming from a Computer Science perspective, which may be quite different from how you learnt programming. 

                           I will concentrate on the big picture and the core ideas behind programming. It might all seem a bit basic to you but it is quite an important topic. So please, stick with me! 

                           Many programming tutorials that you may find online actually focus on teaching you how to code in Python, rather than teaching you important programming concepts. But I do not want you to just be some wannabe Python coder. I want you to be well-rounded programmers! Hopefully this course will achieve that! 

                           Ok, let’s not waste any more time. On with our lesson!`;

courseSummaryObj.setText(courseSummaryText);
const courseSummaryLO = courseSummaryObj.getJSON(); 

const whatIsProgrammingTextObj = new LearningObject("What is programming", "text/plain", "expositive", "narrative text", "low");
whatIsProgrammingTextObj.setText(`Let’s start our lesson with some big questions. 

                                  Firstly, when you hear the word programming, what immediately springs to mind?`);
const whatIsProgrammingTextLO = whatIsProgrammingTextObj.getJSON();

const whatIsProgrammingMentiObj = new LearningObject("What is programming", "text/html", "active", "questionnaire", "medium");
whatIsProgrammingMentiObj.setText(`Type in what you think programming means.`);
whatIsProgrammingMentiObj.setLink("https://www.menti.com/6e9zuhcrwn");
whatIsProgrammingMentiObj.setEmbedded();
const whatIsProgrammingMentiLO = whatIsProgrammingMentiObj.getJSON(); 
 
const whatIsProgrammingAnsObj = new LearningObject("What is programming", "text/html", "expositive", "self assessment", "low");
whatIsProgrammingAnsObj.setText(`Take a look at how your coursemates and seniors defined programming. Are they similar to your definition? Is there a common pattern? 

                                You can scroll through the responses.`);
whatIsProgrammingAnsObj.setLink("https://www.mentimeter.com/app/presentation/a0ca9d10e49d00b3a7489ec5276f5db2/1df15990258d");
whatIsProgrammingAnsObj.setEmbedded();
const whatIsProgrammingAnsLO = whatIsProgrammingAnsObj.getJSON();

const whatIsAProgramMentiObj = new LearningObject("What is a program", "text/html", "active", "questionnaire", "medium");
whatIsAProgramMentiObj.setText(`Having seen the different responses to programming from your coursemates and seniors, here is another question. 

                                What is a program?`);
whatIsAProgramMentiObj.setLink("https://www.menti.com/hcke489zx7"); 
whatIsAProgramMentiObj.setEmbedded();
const whatIsAProgramMentiLO = whatIsAProgramMentiObj.getJSON();

const whatIsAProgramAnsObj = new LearningObject("What is a program", "text/html", "expositive", "self assessment", "low");
whatIsAProgramAnsObj.setText(`Again, take a look at what your coursemates and seniors’ answers to what a computer program is. 

                              Did you observe anything interesting?`);
whatIsAProgramAnsObj.setLink("https://www.mentimeter.com/app/presentation/30a22cd3cbfed9cd713d4916cf7a816b/3c693b9a5dad"); 
whatIsAProgramAnsObj.setEmbedded();
const whatIsAProgramAnsLO = whatIsAProgramAnsObj.getJSON(); 

const instructingComputerTextObj =  new LearningObject("It's all about instructing the computer!", "text/plain", "expositive", "narrative text", "low");
const instructingComputerText = `Summary: 

        Programming ≠ coding 
        Programming ⊃ coding 

        Programming involves: 
        1. Understanding and formulating the problem 
        2. Designing an algorithm to solve the problem 
        3. Implementing the algorithm  

        Machine code is what the computer understands, but us writing machine code will be tedious. High-level languages have been developed to help make programming easier.
        
        Translators convert high-level languages to low-level code: 
        1. **Compilers** pre-translate codes into a set of low-level instructions, which is then executed. 
        2. **Interpreters** translate and execute code line by line, on the fly. 
        
        Programming languages need to be unambiguous.

        Spend more time thinking about the problem and developing a clear algorithm before coding.`;

instructingComputerTextObj.setText(instructingComputerText);
const instructingComputerTextLO = instructingComputerTextObj.getJSON();
 
const instructingComputerLectureObj = new LearningObject("It's all about instructing the computer!", "video/vnd.youtube.yt", "expositive", "lecture", "low");
instructingComputerLectureObj.setText("It's all about instructing the computer!");
instructingComputerLectureObj.setLink("https://youtu.be/pBGfpi9T4pk");
const instructingComputerLectureLO = instructingComputerLectureObj.getJSON();

const algoFlowChartObj = new LearningObject("It's all about instructing the computer!", "image/png", "expositive", "slide", "low");
algoFlowChartObj.setLink("https://storage.googleapis.com/pleap/whatIsProgramming/algoFlowChart.png");
const algoFlowChartLO = algoFlowChartObj.getJSON();

const assemblerTranslatorObj = new LearningObject("It's all about instructing the computer!", "image/png", "expositive", "slide", "low");
assemblerTranslatorObj.setLink("https://storage.googleapis.com/pleap/whatIsProgramming/assemblerTranslator.png");
const assemblerTranslatorLO = assemblerTranslatorObj.getJSON();

const byteCodeObj = new LearningObject("It's all about instructing the computer!", "image/png", "expositive", "slide", "low");
byteCodeObj.setLink("https://storage.googleapis.com/pleap/whatIsProgramming/byteCode.png");
const byteCodeLO = byteCodeObj.getJSON(); 

const compilerInterpreterObj = new LearningObject("It's all about instructing the computer!", "image/png", "expositive", "slide", "low");
compilerInterpreterObj.setLink("https://storage.googleapis.com/pleap/whatIsProgramming/compilerInterpreter.png");
const compilerInterpreterLO = compilerInterpreterObj.getJSON(); 

const programmingNotCodingObj = new LearningObject("It's all about instructing the computer!", "image/png", "expositive", "slide", "low");
programmingNotCodingObj.setLink("https://storage.googleapis.com/pleap/whatIsProgramming/programmingNotCoding.png");
const programmingNotCodingLO = programmingNotCodingObj.getJSON(); 

const programmingSupersetObj = new LearningObject("It's all about instructing the computer!", "image/png", "expositive", "slide", "low");
programmingSupersetObj.setLink("https://storage.googleapis.com/pleap/whatIsProgramming/programmingSuperset.png");
const programmingSupersetLO = programmingSupersetObj.getJSON(); 

export { courseSummaryLO, 
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
        programmingSupersetLO }; 
