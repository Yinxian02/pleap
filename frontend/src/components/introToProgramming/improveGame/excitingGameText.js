import { learningObject } from "../../learningObject";

const excitingGameTextLO = {...learningObject}

excitingGameTextLO.general.title = "Making the guessing game more exciting!";
excitingGameTextLO.general.structure = "atomic";
excitingGameTextLO.general.aggregationLevel = 1;

excitingGameTextLO.technical.format = "text";

excitingGameTextLO.educational.interactivityType = "expositive"
excitingGameTextLO.educational.learningResourceType = "narrative text"
excitingGameTextLO.educational.interactivityLevel = "low"

excitingGameTextLO.content.text = `
Continuing on from our previous video, perhaps we should not have given users infinite chances to get their guess correct?
Summary:
We have added multiple conditions to the while loop.
Beware of logical/semantic errors!
Use variables as constants to make it easier to maintain your code and future-proof.
`
export { excitingGameTextLO };