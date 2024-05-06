import { learningObject as learningObjectTemplate } from './learningObject.js';

const figureLO = { ...learningObjectTemplate };

figureLO.general.structure = "atomic";
figureLO.general.aggregationLevel = 1; 
figureLO.technical.format = ["png", "jpeg"];
figureLO.technical.location = figureLO.technical.location + "/figure";
figureLO.educational.interactivityType = "expositive";  
figureLO.educational.learningResourceType = "figure"; 
figureLO.educational.interactivityLevel = "low";  

export { figureLO };