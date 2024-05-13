import { learningObject } from "../../learningObject";

const whatIsProgrammingTextLO = {...learningObject}

whatIsProgrammingTextLO.general.title = "What is programming";
whatIsProgrammingTextLO.general.structure = "atomic";
whatIsProgrammingTextLO.general.aggregationLevel = 1;

whatIsProgrammingTextLO.technical.format = "text";

whatIsProgrammingTextLO.educational.interactivityType = "expositive"
whatIsProgrammingTextLO.educational.learningResourceType = "narrative text"
whatIsProgrammingTextLO.educational.interactivityLevel = "low"

whatIsProgrammingTextLO.content.text = "Let\’s start our lesson with some big questions. Firstly, when you hear the word programming, what immediately springs to mind?"

export { whatIsProgrammingTextLO };
