import { learningObject as learningObjectTemplate } from './learningObject.js';

const problemStatementLO = { ...learningObjectTemplate };

problemStatementLO.general.structure = "atomic";
problemStatmentLO.general.aggregationLevel = 1; 
problemStatementLO.technical.format = "text";
problemStatementLO.technical.location = problemStatementLO.technical.location + "/problem-statement";
problemStatementLO.educational.interactivityType = "expositive";  
problemStatementLO.educational.learningResourceType = "problem statement"; 
problemStatementLO.educational.interactivityLevel = "low"; 

export { problemStatementLO };