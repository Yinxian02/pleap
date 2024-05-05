import { learningObject as learningObjectTemplate } from './learningObject.js';

const experimentLO = { ...learningObjectTemplate };

experimentLO.general.structure = "atomic";
experimentLO.general.aggregationLevel = 1; 
experimentLO.technical.format = "text";
experimentLO.technical.location = experimentLO.technical.location + "/experiment";
experimentLO.educational.interactivityType = "active";  
experimentLO.educational.learningResourceType = "experiment"; 
experimentLO.educational.interactivityLevel = "low"; 

experimentLO.learningPreferencesValues.activeReflexive = 0;
experimentLO.learningPreferencesValues.sensingIntuitive = 0;
experimentLO.learningPreferencesValues.visualVerbal = 0;
experimentLO.learningPreferencesValues.sequentialGlobal = 0;

export { experimentLO };