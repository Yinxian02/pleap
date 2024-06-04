import { LearningObject } from "../learningObject";

const enrichTextObj = new LearningObject("Enrich the guessing game", "text/plain", "expositive", "narrative text", "low");
enrichTextObj.setText(`We will now update our guessing game so that users can make more than one guess!

                        **Summary:**
                        I have introduced you to the third main programming building block - “repetition”.
                        We looked specifically at a while statement.`);
const enrichTextLO = enrichTextObj.getJSON();

const enrichLectureObj = new LearningObject("Enrich the guessing game", "video/vnd.youtube.yt", "expositive", "lecture", "low");
enrichLectureObj.setText("youtube");
enrichLectureObj.setVideo("https://youtu.be/aWB-IxRjmOQ");
const enrichLectureLO = enrichLectureObj.getJSON();

const repetitionImgObj = new LearningObject("Enrich the guessing game", "image/png", "expositive", "slide", "low");
repetitionImgObj.setImage("https://storage.googleapis.com/pleap/improveGuessingGame/repetition.png");
const repetitionImgLO = repetitionImgObj.getJSON();

const enrichAlgorithmImgObj = new LearningObject("Enrich the guessing game", "image/png", "expositive", "slide", "low");
enrichAlgorithmImgObj.setImage("https://storage.googleapis.com/pleap/improveGuessingGame/enrichAlgorithm.png");
const enrichAlgorithmImgLO = enrichAlgorithmImgObj.getJSON();

const makeGuessingGameMoreInterestingTextObj = new LearningObject("Make the guessing game more interesting", "text/plain", "expositive", "narrative text", "low");
makeGuessingGameMoreInterestingTextObj.setText(`Continuing on from our previous video, perhaps we should not have given users infinite chances to get their guess correct?

                                                **Summary:**

                                                We have added multiple conditions to the while loop.
                                                Beware of logical/semantic errors!
                                                Use variables as constants to make it easier to maintain your code and future-proof.`);
const makeGuessingGameMoreInterestingTextLO = makeGuessingGameMoreInterestingTextObj.getJSON();

const makeGuessingGameMoreInterestingLectureObj = new LearningObject("Make the guessing game more interesting", "video/vnd.youtube.yt", "expositive", "lecture", "low");
makeGuessingGameMoreInterestingLectureObj.setText("youtube");
makeGuessingGameMoreInterestingLectureObj.setVideo("https://youtu.be/xly0dC8eXdc");
const makeGuessingGameMoreInterestingLectureLO = makeGuessingGameMoreInterestingLectureObj.getJSON();

const makeGuessingGameMoreInterestingImgLO = new LearningObject("Make the guessing game more interesting", "image/png", "expositive", "slide", "low");
makeGuessingGameMoreInterestingImgLO.setVideo("https://storage.googleapis.com/pleap/improveGuessingGame/interestingAlgorithm.png");
const makeGuessingGameMoreInterestingImg = makeGuessingGameMoreInterestingImgLO.getJSON();

const improveGuessingGameChallengeLO = new LearningObject("Improve the guessing game challenge", "text/plain", "expositive", "problem statement", "medium");
improveGuessingGameChallengeLO.setText(`**Challenge:**

You now have three basic programming building blocks at your disposal - statement, selection and repetition.

Now, here is another programming challenge for you!

Add more features to the guessing game. Allow the user a maximum of 10 guesses, and output either hot, cold or correct at each guess, terminating either when the guess is correct or the user has exhausted all 10 attempts.

Take your time, and I will wait for you in the next lesson.

And as usual, please remember to understand the problem first before trying to solve it!`);
const improveGuessingGameChallenge = improveGuessingGameChallengeLO.getJSON();

export {
    enrichTextLO,
    enrichLectureLO,
    repetitionImgLO,
    enrichAlgorithmImgLO,
    makeGuessingGameMoreInterestingTextLO,
    makeGuessingGameMoreInterestingLectureLO,
    makeGuessingGameMoreInterestingImg,
    improveGuessingGameChallenge
}