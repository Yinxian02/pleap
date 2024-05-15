import { learningObject } from "../../learningObject";

const improveGameTextLO = {...learningObject}

improveGameTextLO.general.title = "Improve the guessing game";
improveGameTextLO.general.structure = "atomic";
improveGameTextLO.general.aggregationLevel = 1;

improveGameTextLO.technical.format = "text";

improveGameTextLO.educational.interactivityType = "expositive"
improveGameTextLO.educational.learningResourceType = "narrative text"
improveGameTextLO.educational.interactivityLevel = "low"

improveGameTextLO.content.text = "We will now attempt to make the guessing game more user friendly. Summary: 1. I have introduced you to a “two-way selection” block (an if-else statement) 2. Blocks can be nested inside another (composition)."

export { improveGameTextLO };