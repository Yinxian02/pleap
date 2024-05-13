import { learningObject } from "../../learningObject";

const flowSummarySlideLO = {...learningObject}

flowSummarySlideLO.general.title = "It's all about instructing the computer!";
flowSummarySlideLO.general.structure = "atomic";
flowSummarySlideLO.general.aggregationLevel = 1;

flowSummarySlideLO.technical.format = "image/png";

flowSummarySlideLO.educational.interactivityType = "expositive"
flowSummarySlideLO.educational.learningResourceType = "slide"
flowSummarySlideLO.educational.interactivityLevel = "low"

flowSummarySlideLO.content.image = "./flowSummary.png"

export { flowSummarySlideLO };
