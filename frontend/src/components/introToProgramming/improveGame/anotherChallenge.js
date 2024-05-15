import { learningObject } from "../../learningObject";

const anotherChallengeTextLO = {...learningObject}

anotherChallengeTextLO.general.title = "Improving the guessing game";
anotherChallengeTextLO.general.structure = "atomic";
anotherChallengeTextLO.general.aggregationLevel = 1;

anotherChallengeTextLO.technical.format = "text";

anotherChallengeTextLO.educational.interactivityType = "active"
anotherChallengeTextLO.educational.learningResourceType = "exercise"
anotherChallengeTextLO.educational.interactivityLevel = "low"

anotherChallengeTextLO.content.text = `You now have three basic programming building blocks at your disposal - statement, selection and repetition.

Now, here is another programming challenge for you!

Add more features to the guessing game. Allow the user a maximum of 10 guesses, and output either hot, cold or correct at each guess, terminating either when the guess is correct or the user has exhausted all 10 attempts.

Take your time, and I will wait for you in the next lesson.

And as usual, please remember to understand the problem first before trying to solve it!`

export { anotherChallengeTextLO };