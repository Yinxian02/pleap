import { learningObject } from "../../learningObject";

const enrichGameLectureLO = {...learningObject}

enrichGameLectureLO.general.title = "Improve the guessing game";
enrichGameLectureLO.general.structure = "atomic";
enrichGameLectureLO.general.aggregationLevel = 1;

enrichGameLectureLO.technical.format = "video";

enrichGameLectureLO.educational.interactivityType = "expositive"
enrichGameLectureLO.educational.learningResourceType = "lecture"
enrichGameLectureLO.educational.interactivityLevel = "low"

enrichGameLectureLO.content.text = `"https://youtu.be/aWB-IxRjmOQ"`

export { enrichGameLectureLO };