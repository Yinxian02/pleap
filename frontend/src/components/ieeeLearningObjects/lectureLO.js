import { learningObject as learningObjectTemplate } from './learningObject.js';

const lectureLO = { ...learningObjectTemplate };

lectureLO.general.structure = "atomic";
lectureLO.general.aggregationLevel = 1; 
lectureLO.technical.format = "video";
lectureLO.technical.location = lectureLO.technical.location + "/lecture";
lectureLO.educational.interactivityType = "expositive";  
lectureLO.educational.learningResourceType = "lecture"; 
lectureLO.educational.interactivityLevel = "low"; 

lectureLO.learningPreferencesValues.activeReflexive = 1;
lectureLO.learningPreferencesValues.sensingIntuitive = 1;
lectureLO.learningPreferencesValues.visualVerbal = 1;
lectureLO.learningPreferencesValues.sequentialGlobal = 0;

export { lectureLO };