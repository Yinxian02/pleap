import { LearningObject } from "../learningObject";

const introText = "We will now dive in straight into designing a very simple guessing game. Summary: Always try to understand the problem first before you start! Guessing game outputs 'correct' if user number matches a secret number defined";
const introTextLO = new LearningObject("Designing a guessing game", "text/plain", "expositive", "narrative text", "low", introText).getJSON(); 

const introLecture = "https://youtu.be/Rl19zAOMGjs"; 
const introLectureLO = new LearningObject("Designing a guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low", introLecture).getJSON(); 

const designAlgoText = "Summary: You design your algorithm (on paper!) after understanding the problem. I have introduced two “basic building blocks” of programming in this video: Simple statement Selection"
const designAlgoTextLO = new LearningObject("Designing an algorithm for the guessing game", "text/plain", "expositive", "narrative text", "low", designAlgoText).getJSON(); 

const designAlgoLecture = "https://youtu.be/eeRkO18_Pj8"; 
const designAlgoLectureLO = new LearningObject("Designing an algorithm for the guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low", designAlgoLecture).getJSON(); 

const designAlgoPseudocode = `let secretNumber = 42 
                let userGuess = read input 
                if userGuess = secretNumber print 'correct'`;

const designAlgoPseudocodeLO = new LearningObject("Designing an algorithm for the guessing game", "text/plain", "expositive", "narrative text", "low", designAlgoPseudocode).getJSON(); 

const simpleStatementImg = "https://storage.googleapis.com/pleap/designGuessingGame/simpleStatement.png";
const simpleStatementImgLO = new LearningObject("Designing an algorithm for the guessing game","image/png", "expositive", "slide", "low", simpleStatementImg).getJSON(); 

const selectionImg = "https://storage.googleapis.com/pleap/designGuessingGame/selection.png";
const selectionImgLO = new LearningObject("Designing an algorithm for the guessing game","image/png", "expositive", "slide", "low", selectionImg).getJSON(); 

const improveGameText = "We will now attempt to make the guessing game more user friendly. Summary: I have introduced you to a “two-way selection” block (an if-else statement) Blocks can be nested inside another (composition).";
const improveGameTextLO = new LearningObject("Improving the guessing game", "text/plain", "expositive", "narrative text", "low", improveGameText).getJSON(); 

const improveGameLecture = "https://youtu.be/5sXO3FKS_vg"; 
const improveGameLectureLO = new LearningObject("Improving the guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low", improveGameLecture).getJSON(); 

const improveGamePseudocode = `let secretNumber = 42 
                             let userGuess = read input 
                             if userGuess = secretNumber 
                                 print 'correct'
                                 else 
                                   if userGuess < secretNumber 
                                   print 'too low' 
                                else 
                                    print 'too high'`;
                                    
const improveGamePseudocodeLO = new LearningObject("Improving the guessing game", "text/plain", "expositive", "narrative text", "low", improveGamePseudocode).getJSON(); 

const ifElseImg = "https://storage.googleapis.com/pleap/designGuessingGame/ifElseStatement.png";
const ifElseImgLO = new LearningObject("Improving the guessing game","image/png", "expositive", "slide", "low", ifElseImg).getJSON(); 

const challengeGameExercise = 
    `To become a good programmer, what you need to do is to practise, practise and practise!

    So here is a challenge for you. Try to make the guessing game even more informative!

    Instead of “too high” or “too low”, design a version of the guessing game that tells the user how close their guess is to the secret number. The program should output:

    “cold” when the number is incorrect but far from the secret number
    “hot” when the number is incorrect but close
    “correct” when it is correct.
    You can decide for yourself how close you want the number to be from the secret number to be considered “hot”, and how far for “cold”.

    After that, try making it even more informative with five degrees of correctness: “cold”, “cool”, “warm”, “hot”, “correct”. Again, you can decide for yourself what you mean by “cold”, “cool”, etc.

    Try designing your program for these before moving on!

    And remember, think about the problem before actually writing your pseudocode!`
const challengeGameExerciseLO = new LearningObject("Challenge! Make the guessing game even more informative", "text/plain", "active", "exercise", "low", challengeGameExercise).getJSON(); 



export { introTextLO,
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
         challengeGameExerciseLO }; 