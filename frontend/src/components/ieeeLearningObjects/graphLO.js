import { learningObject as learningObjectTemplate } from './learningObject.js';

const graphLO = { ...learningObjectTemplate };

graphLO.general.structure = "atomic";
graphLO.general.aggregationLevel = 1; 
graphLO.technical.format = ["png", "jpeg"];
graphLO.technical.location = graphLO.technical.location + "/graph";
graphLO.educational.interactivityType = "expositive";  
graphLO.educational.learningResourceType = "graph"; 
graphLO.educational.interactivityLevel = "low";  

graphLO.learningPreferencesValues.activeReflexive = 1;
graphLO.learningPreferencesValues.sensingIntuitive = 0;
graphLO.learningPreferencesValues.visualVerbal = 0;
graphLO.learningPreferencesValues.sequentialGlobal = 0;

export { graphLO };