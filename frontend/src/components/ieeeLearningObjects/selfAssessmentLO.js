import { learningObject as learningObjectTemplate } from './learningObject.js';

const selfAssessmentLO = { ...learningObjectTemplate };

selfAssessmentLO.general.structure = "atomic";
selfAssessmentLO.general.aggregationLevel = 1; 
selfAssessmentLO.technical.format = "text";
selfAssessmentLO.technical.location = selfAssessmentLO.technical.location + "/self-assessment";
selfAssessmentLO.educational.interactivityType = "expositive";  
selfAssessmentLO.educational.learningResourceType = "self assessment"; 
selfAssessmentLO.educational.interactivityLevel = "low"; 

selfAssessmentLO.learningPreferencesValues.activeReflexive = 1;
selfAssessmentLO.learningPreferencesValues.sensingIntuitive = 0;
selfAssessmentLO.learningPreferencesValues.visualVerbal = 0;
selfAssessmentLO.learningPreferencesValues.sequentialGlobal = 0;

export { selfAssessmentLO };