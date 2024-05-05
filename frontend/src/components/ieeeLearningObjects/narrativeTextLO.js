import { learningObject as learningObjectTemplate } from './learningObject.js';

const narrativeTextLO = { ...learningObjectTemplate };

narrativeTextLO.general.structure = "atomic";
narrativeTextLO.general.aggregationLevel = 1; 
narrativeTextLO.technical.format = "text";
narrativeTextLO.technical.location = narrativeTextLO.technical.location + "/narrative-text";
narrativeTextLO.educational.interactivityType = "expositive";  
narrativeTextLO.educational.learningResourceType = "narrative text"; 
narrativeTextLO.educational.interactivityLevel = "low"; 

narrativeTextLO.learningPreferencesValues.activeReflexive = 1;
narrativeTextLO.learningPreferencesValues.sensingIntuitive = 1;
narrativeTextLO.learningPreferencesValues.visualVerbal = 1;
narrativeTextLO.learningPreferencesValues.sequentialGlobal = 0;

export { narrativeTextLO };