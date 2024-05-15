import { learningObject } from "../../learningObject";

const challengeGameTextLO = {...learningObject}

challengeGameTextLO.general.title = "Improving the guessing game";
challengeGameTextLO.general.structure = "atomic";
challengeGameTextLO.general.aggregationLevel = 1;

challengeGameTextLO.technical.format = "text";

challengeGameTextLO.educational.interactivityType = "active"
challengeGameTextLO.educational.learningResourceType = "exercise"
challengeGameTextLO.educational.interactivityLevel = "low"

challengeGameTextLO.content.text = `Make the guessing game even more informative

To become a good programmer, what you need to do is to practise, practise and practise!

So here is a challenge for you. Try to make the guessing game even more informative!

Instead of “too high” or “too low”, design a version of the guessing game that tells the user how close their guess is to the secret number. The program should output:

“cold” when the number is incorrect but far from the secret number
“hot” when the number is incorrect but close
“correct” when it is correct.
You can decide for yourself how close you want the number to be from the secret number to be considered “hot”, and how far for “cold”.

After that, try making it even more informative with five degrees of correctness: “cold”, “cool”, “warm”, “hot”, “correct”. Again, you can decide for yourself what you mean by “cold”, “cool”, etc.

Try designing your program for these before moving on!

And remember, think about the problem before actually writing your pseudocode!`

export { challengeGameTextLO };