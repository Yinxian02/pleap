import { learningObject as learningObjectTemplate } from './learningObject.js';

const experimentLO = { ...learningObjectTemplate };

experimentLO.general.structure = "atomic";
experimentLO.general.aggregationLevel = 1; 
experimentLO.technical.format = "text";
experimentLO.technical.location = experimentLO.technical.location + "/experiment";
experimentLO.educational.interactivityType = "active";  
experimentLO.educational.learningResourceType = "experiment"; 
experimentLO.educational.interactivityLevel = "low"; 

export { experimentLO };