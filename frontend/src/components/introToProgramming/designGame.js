import { LearningObject } from "../learningObject";

const introTextObj = new LearningObject("Designing a guessing game", "text/plain", "expositive", "narrative text", "low");
const introText = "We will now dive in straight into designing a very simple guessing game. Summary: Always try to understand the problem first before you start! Guessing game outputs 'correct' if user number matches a secret number defined";
introTextObj.setText(introText);
const introTextLO = introTextObj.getJSON(); 

const introLectureObj = new LearningObject("Designing a guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low");
const introLecture = "https://youtu.be/Rl19zAOMGjs"; 
introLectureObj.setText("youtube");
introLectureObj.setLink(introLecture); 
const introLectureLO = introLectureObj.getJSON(); 

const designAlgoTextObj = new LearningObject("Designing an algorithm for the guessing game", "text/plain", "expositive", "narrative text", "low");
const designAlgoText = "Summary: You design your algorithm (on paper!) after understanding the problem. I have introduced two “basic building blocks” of programming in this video: Simple statement Selection";
designAlgoTextObj.setText(designAlgoText); 
const designAlgoTextLO = designAlgoTextObj.getJSON(); 

const designAlgoLectureObj = new LearningObject("Designing an algorithm for the guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low");
const designAlgoLecture = "https://youtu.be/eeRkO18_Pj8"; 
designAlgoLectureObj.setText("youtube");
designAlgoLectureObj.setLink(designAlgoLecture); 
const designAlgoLectureLO = designAlgoLectureObj.getJSON(); 

const designAlgoPseudocodeObj = new LearningObject("Designing an algorithm for the guessing game", "text/plain", "expositive", "narrative text", "low");
const designAlgoPseudocode = `let secretNumber = 42 
                let userGuess = read input 
                if userGuess = secretNumber print 'correct'`;
designAlgoPseudocodeObj.setText(designAlgoPseudocode);
const designAlgoPseudocodeLO = designAlgoPseudocodeObj.getJSON(); 

const simpleStatementImgObj = new LearningObject("Designing an algorithm for the guessing game","image/png", "expositive", "slide", "low");
const simpleStatementImg = "https://storage.googleapis.com/pleap/designGuessingGame/simpleStatement.png";
simpleStatementImgObj.setLink(simpleStatementImg);
const simpleStatementImgLO = simpleStatementImgObj.getJSON(); 

const selectionImgObj = new LearningObject("Designing an algorithm for the guessing game","image/png", "expositive", "slide", "low");
const selectionImg = "https://storage.googleapis.com/pleap/designGuessingGame/selection.png";
selectionImgObj.setLink(selectionImg); 
const selectionImgLO = selectionImgObj.getJSON(); 

const improveGameTextObj = new LearningObject("Improving the guessing game", "text/plain", "expositive", "narrative text", "low");
const improveGameText = "We will now attempt to make the guessing game more user friendly. Summary: I have introduced you to a “two-way selection” block (an if-else statement) Blocks can be nested inside another (composition).";
improveGameTextObj.setText(improveGameText);
const improveGameTextLO = improveGameTextObj.getJSON(); 

const improveGameLectureObj = new LearningObject("Improving the guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low");
const improveGameLecture = "https://youtu.be/5sXO3FKS_vg"; 
improveGameLectureObj.setText("youtube");
improveGameLectureObj.setLink(improveGameLecture); 
const improveGameLectureLO = improveGameLectureObj.getJSON(); 

const improveGamePseudocodeObj = new LearningObject("Improving the guessing game", "text/plain", "expositive", "narrative text", "low");
const improveGamePseudocode = `let secretNumber = 42 
                             let userGuess = read input 
                             if userGuess = secretNumber 
                                 print 'correct'
                                 else 
                                   if userGuess < secretNumber 
                                   print 'too low' 
                                else 
                                    print 'too high'`;
improveGamePseudocodeObj.setText(improveGamePseudocode);                                    
const improveGamePseudocodeLO = improveGamePseudocodeObj.getJSON(); 

const ifElseImgObj = new LearningObject("Improving the guessing game","image/png", "expositive", "slide", "low");
const ifElseImg = "https://storage.googleapis.com/pleap/designGuessingGame/ifElseStatement.png";
ifElseImgObj.setLink(ifElseImg);
const ifElseImgLO = ifElseImgObj.getJSON(); 

const challengeGameExerciseObj = new LearningObject("Challenge! Make the guessing game even more informative", "text/plain", "active", "exercise", "low");
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
challengeGameExerciseObj.setText(challengeGameExercise); 
const challengeGameExerciseLO = challengeGameExerciseObj.getJSON(); 


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