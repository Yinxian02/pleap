import { learningObject as learningObjectTemplate } from './learningObject.js';

const questionnaireLO = { ...learningObjectTemplate };

questionnaireLO.general.structure = "atomic";
questionnaireLO.general.aggregationLevel = 1; 
questionnaireLO.technical.format = "text";
questionnaireLO.technical.location = questionnaireLO.technical.location + "/questionnaire";
questionnaireLO.educational.interactivityType = "active";
questionnaireLO.educational.learningResourceType = "questionnaire"; 
questionnaireLO.educational.interactivityLevel = "high"; 

questionnaireLO.learningPreferencesValues.activeReflexive = 0;
questionnaireLO.learningPreferencesValues.sensingIntuitive = 1;
questionnaireLO.learningPreferencesValues.visualVerbal = 0;
questionnaireLO.learningPreferencesValues.sequentialGlobal = 0;

export { questionnaireLO };