import { learningObject as learningObjectTemplate } from './learningObject.js';

const diagramLO = { ...learningObjectTemplate };

diagramLO.general.structure = "atomic";
diagramLO.general.aggregationLevel = 1; 
diagramLO.technical.format = ["png", "jpeg"];
diagramLO.technical.location = diagramLO.technical.location + "/diagram";
diagramLO.educational.interactivityType = "expositive";  
diagramLO.educational.learningResourceType = "diagram"; 
diagramLO.educational.interactivityLevel = "low"; 

diagramLO.learningPreferencesValues.activeReflexive = 1;
diagramLO.learningPreferencesValues.sensingIntuitive = 0;
diagramLO.learningPreferencesValues.visualVerbal = 0;
diagramLO.learningPreferencesValues.sequentialGlobal = 0;

export { diagramLO };