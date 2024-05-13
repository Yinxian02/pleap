import { learningObject } from "../../learningObject";

const programmingSlideLO = {...learningObject}

programmingSlideLO.general.title = "It's all about instructing the computer!";
programmingSlideLO.general.structure = "atomic";
programmingSlideLO.general.aggregationLevel = 1;

programmingSlideLO.technical.format = "image/png";

programmingSlideLO.educational.interactivityType = "expositive"
programmingSlideLO.educational.learningResourceType = "slide"
programmingSlideLO.educational.interactivityLevel = "low"

programmingSlideLO.content.image = "./programming.png"

export { programmingSlideLO };