import { learningObject as learningObjectTemplate } from './learningObject.js';

const indexLO = { ...learningObjectTemplate };

indexLO.general.structure = "atomic";
indexLO.general.aggregationLevel = 1; 
indexLO.technical.format = "html";
indexLO.technical.location = indexLO.technical.location + "/index";
indexLO.educational.interactivityType = "expositive";  
indexLO.educational.learningResourceType = "index"; 
indexLO.educational.interactivityLevel = "medium"; 

export { indexLO };