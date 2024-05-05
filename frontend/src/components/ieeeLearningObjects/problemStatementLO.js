import { learningObject as learningObjectTemplate } from './learningObject.js';

const problemStatementLO = { ...learningObjectTemplate };

problemStatementLO.general.structure = "atomic";
problemStatmentLO.general.aggregationLevel = 1; 
problemStatementLO.technical.format = "text";
problemStatementLO.technical.location = problemStatementLO.technical.location + "/problem-statement";
problemStatementLO.educational.interactivityType = "expositive";  
problemStatementLO.educational.learningResourceType = "problem statement"; 
problemStatementLO.educational.interactivityLevel = "low"; 

problemStatementLO.learningPreferencesValues.activeReflexive = 0;
problemStatementLO.learningPreferencesValues.sensingIntuitive = 1;
problemStatementLO.learningPreferencesValues.visualVerbal = 0;
problemStatementLO.learningPreferencesValues.sequentialGlobal = 0;

export { problemStatementLO };