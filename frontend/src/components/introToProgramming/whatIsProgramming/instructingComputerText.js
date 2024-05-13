import { learningObject } from "../../learningObject";

const instructingComputerTextLO = {...learningObject}

instructingComputerTextLO.general.title = "It's all about instructing the computer!";
instructingComputerTextLO.general.structure = "atomic";
instructingComputerTextLO.general.aggregationLevel = 1;

instructingComputerTextLO.technical.format = "text";

instructingComputerTextLO.educational.interactivityType = "expositive"
instructingComputerTextLO.educational.learningResourceType = "narrative text"
instructingComputerTextLO.educational.interactivityLevel = "low"

instructingComputerTextLO.content.text = "Programming &ne; coding <br> Programming &superset; of coding <br><br> Programming involves: <br> 1. Understanding and formulating the problem <br> 2. Designing an algorithm to solve the problem <br> 3. Implementing the algorithm <br><br> Machine code is what the computer understands, but us writing machine code will be tedious. <br><br> High-level languages have been developed to help make programming easier. <br><br> Translators convert high-level languages to low-level code: <br> 1. Compilers pre-translate codes into a set of low-level instructions, which is then executed. <br> 2. Interpreters translate and execute code line by line, on the fly. <br><br> Programming languages need to be unambiguous. <br><br> Spend more time thinking about the problem and developing a clear algorithm before coding.";
