import { learningObject as learningObjectTemplate } from './learningObject.js';

const slideLO = { ...learningObjectTemplate };

slideLO.general.structure = "atomic";
slideLO.general.aggregationLevel = 1; 
slideLO.technical.format = "pdf";
slideLO.technical.location = slideLO.technical.location + "/slide";
slideLO.educational.interactivityType = "expositive";  
slideLO.educational.learningResourceType = "slide"; 
slideLO.educational.interactivityLevel = "low"; 

slideLO.learningPreferencesValues.activeReflexive = 1;
slideLO.learningPreferencesValues.sensingIntuitive = 1;
slideLO.learningPreferencesValues.visualVerbal = 0;
slideLO.learningPreferencesValues.sequentialGlobal = 0;

export { slideLO };