import { LearningObject } from "../learningObject";

const courseSummaryText = "As this is our first lesson together, I have prepared a set of short and hopefully fun videos for this lesson to whet your programming appetite. So you can sit back and enjoy this lesson. \n In future lessons, you will actually be more hands-on and do things yourself! \n In this first lesson, we will focus on the programming part of the course, which is as important as the Python part. In fact, it might even be more important in the longer term. I know you cannot wait to sink your teeth into Python… but please be patient and stick with me for now. We will get to Python by the end of the lesson, I promise! \n In this lesson, I will be presenting programming from a Computer Science perspective, which may be quite different from how you learnt programming. I will concentrate on the big picture and the core ideas behind programming. It might all seem a bit basic to you but it is quite an important topic. So please, stick with me! \n Many programming tutorials that you may find online actually focus on teaching you how to code in Python, rather than teaching you important programming concepts. But I do not want you to just be some wannabe Python coder. I want you to be well-rounded programmers! Hopefully this course will achieve that! Ok, let\’s not waste any more time. On with our lesson!"
const courseSummaryLO = new LearningObject("Introduction to Course", "text/plain", "expositive", "problem statement", "low", courseSummaryText).getJSON(); 

const whatIsProgrammingText = "Let\’s start our lesson with some big questions. Firstly, when you hear the word programming, what immediately springs to mind?"
const whatIsProgrammingTextLO = new LearningObject("What is programming", "text/plain", "expositive", "narrative text", "low", whatIsProgrammingText).getJSON();

const whatIsProgrammingMentiLink = "https://www.menti.com/6e9zuhcrwn";
const whatIsProgrammingMentiLO = new LearningObject("What is programming", "text", "active", "questionnaire", "medium", whatIsProgrammingMentiLink).getJSON();

const whatIsProgrammingAnsLink = "https://www.mentimeter.com/app/presentation/a0ca9d10e49d00b3a7489ec5276f5db2/1df15990258d"
const whatIsProgrammingAnsLO = new LearningObject("What is programming", "text", "expositive", "self assessment", "low", whatIsProgrammingAnsLink).getJSON();

const whatIsAProgramText = "Having seen the different responses to programming from your coursemates and seniors, here is another question. What is a computer program? (We will use the American spelling instead of programme as it is more widespread)."
const whatIsAProgramTextLO = new LearningObject("What is a program", "text/plain", "expositive", "narrative text", "low", whatIsAProgramText).getJSON();

const whatIsAProgramMentiLink = "https://www.menti.com/hcke489zx7";
const whatIsAProgramMentiLO = new LearningObject("What is a program", "text", "active", "questionnaire", "medium", whatIsAProgramMentiLink).getJSON();

const whatIsAProgramAnsLink = "https://www.mentimeter.com/app/presentation/30a22cd3cbfed9cd713d4916cf7a816b/3c693b9a5dad"
const whatIsAProgramAnsLO = new LearningObject("What is a program", "text", "expositive", "self assessment", "low", whatIsAProgramAnsLink).getJSON();

const instructingComputerText = "Programming &ne; coding <br> Programming &superset; of coding <br><br> Programming involves: <br> 1. Understanding and formulating the problem <br> 2. Designing an algorithm to solve the problem <br> 3. Implementing the algorithm <br><br> Machine code is what the computer understands, but us writing machine code will be tedious. <br><br> High-level languages have been developed to help make programming easier. <br><br> Translators convert high-level languages to low-level code: <br> 1. Compilers pre-translate codes into a set of low-level instructions, which is then executed. <br> 2. Interpreters translate and execute code line by line, on the fly. <br><br> Programming languages need to be unambiguous. <br><br> Spend more time thinking about the problem and developing a clear algorithm before coding.";
const instructingComputerTextLO = new LearningObject("It's all about instructing the computer!", "text/plain", "expositive", "narrative text", "low", instructingComputerText).getJSON();

const instructingComputerLectureLink = "https://youtu.be/pBGfpi9T4pk"
const instructingComputerLectureLO = new LearningObject("It's all about instructing the computer!", "text", "expositive", "lecture", "low", instructingComputerLectureLink).getJSON();


export { courseSummaryLO, 
        whatIsProgrammingTextLO, 
        whatIsProgrammingMentiLO, 
        whatIsProgrammingAnsLO,
        whatIsAProgramTextLO,
        whatIsAProgramMentiLO, 
        whatIsAProgramAnsLO,
        instructingComputerTextLO,
        instructingComputerLectureLO }; 
