import { learningObject as learningObjectTemplate } from './learningObject.js';

const tableLO = { ...learningObjectTemplate };

tableLO.general.structure = "atomic";
tableLO.general.aggregationLevel = 1; 
tableLO.technical.format = ["png", "jpeg"];
tableLO.technical.location = tableLO.technical.location + "/table";
tableLO.educational.interactivityType = "expositive";  
tableLO.educational.learningResourceType = "table"; 
tableLO.educational.interactivityLevel = "low"; 

tableLO.learningPreferencesValues.activeReflexive = 1;
tableLO.learningPreferencesValues.sensingIntuitive = 0;
tableLO.learningPreferencesValues.visualVerbal = 0;
tableLO.learningPreferencesValues.sequentialGlobal = 0;

export { tableLO };