import { learningObject as learningObjectTemplate } from './learningObject.js';

const tableLO = { ...learningObjectTemplate };

tableLO.general.structure = "atomic";
tableLO.general.aggregationLevel = 1; 
tableLO.technical.format = ["png", "jpeg"];
tableLO.technical.location = tableLO.technical.location + "/table";
tableLO.educational.interactivityType = "expositive";  
tableLO.educational.learningResourceType = "table"; 
tableLO.educational.interactivityLevel = "low"; 

export { tableLO };