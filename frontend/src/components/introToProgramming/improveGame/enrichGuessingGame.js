import { learningObject } from "../../learningObject";

const enrichGameTextLO = {...learningObject}

enrichGameTextLO.general.title = "Enrich the guessing game";
enrichGameTextLO.general.structure = "atomic";
enrichGameTextLO.general.aggregationLevel = 1;

enrichGameTextLO.technical.format = "text";

enrichGameTextLO.educational.interactivityType = "expositive"
enrichGameTextLO.educational.learningResourceType = "narrative text"
enrichGameTextLO.educational.interactivityLevel = "low"

enrichGameTextLO.content.link = "We will now update our guessing game so that users can make more than one guess! Summary: I have introduced you to the third main programming building block - “repetition”. We looked specifically at a while statement."

export { enrichGameTextLO };