import { learningObject } from "../../learningObject";

const programmingNotCodingSlideLO = {...learningObject}

programmingNotCodingSlideLO.general.title = "It's all about instructing the computer!";
programmingNotCodingSlideLO.general.structure = "atomic";
programmingNotCodingSlideLO.general.aggregationLevel = 1;

programmingNotCodingSlideLO.technical.format = "image/png";

programmingNotCodingSlideLO.educational.interactivityType = "expositive"
programmingNotCodingSlideLO.educational.learningResourceType = "slide"
programmingNotCodingSlideLO.educational.interactivityLevel = "low"

programmingNotCodingSlideLO.content.image = "./programmingNotCoding.png"

export { programmingNotCodingSlideLO };