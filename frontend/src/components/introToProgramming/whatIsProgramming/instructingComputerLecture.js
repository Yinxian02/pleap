import { learningObject } from "../../learningObject";

const instructingComputerLectureLO = {...learningObject}

instructingComputerLectureLO.general.title = "It's all about instructing the computer!";
instructingComputerLectureLO.general.structure = "atomic";
instructingComputerLectureLO.general.aggregationLevel = 1;

instructingComputerLectureLO.technical.format = "video";

instructingComputerLectureLO.educational.interactivityType = "expositive"
instructingComputerLectureLO.educational.learningResourceType = "lecture"
instructingComputerLectureLO.educational.interactivityLevel = "low"

instructingComputerLectureLO.content.link = "https://youtu.be/pBGfpi9T4pk"

export { instructingComputerLectureLO };