import { LearningObject } from "../learningObject";

const introTextObj = new LearningObject("Designing a guessing game", "text/plain", "expositive", "narrative text", "low");
introTextObj.setText(`We will now dive in straight into designing a very simple guessing game. 

                      Summary: 
                      Always try to understand the problem first before you start!`);
const introTextLO = introTextObj.getJSON(); 

const introLectureObj = new LearningObject("Designing a guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low");
introLectureObj.setText("youtube");
introLectureObj.setLink("https://youtu.be/Rl19zAOMGjs"); 
const introLectureLO = introLectureObj.getJSON(); 

const designAlgoTextObj = new LearningObject("Designing an algorithm for the guessing game", "text/plain", "expositive", "narrative text", "low");
designAlgoTextObj.setText(`Summary: 

                           You design your algorithm (on paper!) after understanding the problem. 
                           I have introduced two “basic building blocks” of programming in this video: 
                           1. Simple statement 
                           2. Selection`); 
const designAlgoTextLO = designAlgoTextObj.getJSON(); 

const designAlgoLectureObj = new LearningObject("Designing an algorithm for the guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low");
designAlgoLectureObj.setText("youtube");
designAlgoLectureObj.setLink("https://youtu.be/eeRkO18_Pj8"); 
const designAlgoLectureLO = designAlgoLectureObj.getJSON(); 

// const designAlgoPseudocodeObj = new LearningObject("Designing an algorithm for the guessing game", "text/plain", "expositive", "narrative text", "low");
// const designAlgoPseudocode = `let secretNumber = 42 
//                 let userGuess = read input 
//                 if userGuess = secretNumber print 'correct'`;
// designAlgoPseudocodeObj.setText(designAlgoPseudocode);
// const designAlgoPseudocodeLO = designAlgoPseudocodeObj.getJSON(); 

// const simpleStatementImgObj = new LearningObject("Designing an algorithm for the guessing game","image/png", "expositive", "slide", "low");
// simpleStatementImgObj.setLink("https://storage.googleapis.com/pleap/designGuessingGame/simpleStatement.png");
// const simpleStatementImgLO = simpleStatementImgObj.getJSON(); 

const selectionImgObj = new LearningObject("Designing an algorithm for the guessing game","image/png", "expositive", "slide", "low");
selectionImgObj.setLink("https://storage.googleapis.com/pleap/designGuessingGame/selection.png"); 
const selectionImgLO = selectionImgObj.getJSON(); 

const improveGameTextObj = new LearningObject("Improving the guessing game", "text/plain", "expositive", "narrative text", "low");
improveGameTextObj.setText(`We will now attempt to make the guessing game more user friendly. 
                            
                            Summary: 

                            I have introduced you to a “two-way selection” block (an if-else statement) 
                            Blocks can be nested inside another (composition).`);
const improveGameTextLO = improveGameTextObj.getJSON(); 

const improveGameLectureObj = new LearningObject("Improving the guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low"); 
improveGameLectureObj.setText("youtube");
improveGameLectureObj.setLink("https://youtu.be/5sXO3FKS_vg"); 
const improveGameLectureLO = improveGameLectureObj.getJSON(); 

// const improveGamePseudocodeObj = new LearningObject("Improving the guessing game", "text/plain", "expositive", "narrative text", "low");
// const improveGamePseudocode = `let secretNumber = 42 
//                              let userGuess = read input 
//                              if userGuess = secretNumber 
//                                  print 'correct'
//                                  else 
//                                    if userGuess < secretNumber 
//                                    print 'too low' 
//                                 else 
//                                     print 'too high'`;
// improveGamePseudocodeObj.setText(improveGamePseudocode);                                    
// const improveGamePseudocodeLO = improveGamePseudocodeObj.getJSON(); 

// const ifElseImgObj = new LearningObject("Improving the guessing game","image/png", "expositive", "slide", "low");
// ifElseImgObj.setLink("https://storage.googleapis.com/pleap/designGuessingGame/ifElseStatement.png");
// const ifElseImgLO = ifElseImgObj.getJSON(); 

const challengeGameExerciseObj = new LearningObject("Challenge! Make the guessing game even more informative", "text/plain", "active", "exercise", "low");
challengeGameExerciseObj.setText(`To become a good programmer, what you need to do is to practise, practise and practise!

                            So here is a challenge for you. Try to make the guessing game **even more** informative!

                            Instead of “too high” or “too low”, design a version of the guessing game that tells the user how **close** their guess is to the secret number. The program should output:

                            “cold” when the number is incorrect but far from the secret number
                            “hot” when the number is incorrect but close
                            “correct” when it is correct.

                            You can decide for yourself how close you want the number to be from the secret number to be considered “hot”, and how far for “cold”.

                            After that, try making it **even more** informative with five degrees of correctness: “cold”, “cool”, “warm”, “hot”, “correct”. Again, you can decide for yourself what you mean by “cold”, “cool”, etc.

                            Try designing your program for these before moving on!

                            And remember, think about the problem before actually writing your pseudocode!`); 
const challengeGameExerciseLO = challengeGameExerciseObj.getJSON(); 


export { introTextLO,
         introLectureLO,
         designAlgoTextLO,
         designAlgoLectureLO,
        //  designAlgoPseudocodeLO,
        //  simpleStatementImgLO,
         selectionImgLO,
         improveGameTextLO,
         improveGameLectureLO,
        //  improveGamePseudocodeLO,
        //  ifElseImgLO,
         challengeGameExerciseLO }; 