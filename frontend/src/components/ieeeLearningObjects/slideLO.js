import { learningObject as learningObjectTemplate } from './learningObject.js';

const slideLO = { ...learningObjectTemplate };

slideLO.general.structure = "atomic";
slideLO.general.aggregationLevel = 1; 
slideLO.technical.format = "pdf";
slideLO.technical.location = slideLO.technical.location + "/slide";
slideLO.educational.interactivityType = "expositive";  
slideLO.educational.learningResourceType = "slide"; 
slideLO.educational.interactivityLevel = "low"; 

export { slideLO };