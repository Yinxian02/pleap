import { learningObject as learningObjectTemplate } from './learningObject.js';

const examLO = { ...learningObjectTemplate };

examLO.general.structure = "atomic";
examLO.general.aggregationLevel = 1; 
examLO.technical.format = "text";
examLO.technical.location = examLO.technical.location + "/exam";
examLO.educational.interactivityType = "active";  
examLO.educational.learningResourceType = "exam"; 
examLO.educational.interactivityLevel = "low"; 

export { examLO };