import { learningObject as learningObjectTemplate } from './learningObject.js';

const selfAssessmentLO = { ...learningObjectTemplate };

selfAssessmentLO.general.structure = "atomic";
selfAssessmentLO.general.aggregationLevel = 1; 
selfAssessmentLO.technical.format = "text";
selfAssessmentLO.technical.location = selfAssessmentLO.technical.location + "/self-assessment";
selfAssessmentLO.educational.interactivityType = "expositive";  
selfAssessmentLO.educational.learningResourceType = "self assessment"; 
selfAssessmentLO.educational.interactivityLevel = "low"; 

export { selfAssessmentLO };