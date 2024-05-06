import { learningObject as learningObjectTemplate } from './learningObject.js';

const graphLO = { ...learningObjectTemplate };

graphLO.general.structure = "atomic";
graphLO.general.aggregationLevel = 1; 
graphLO.technical.format = ["png", "jpeg"];
graphLO.technical.location = graphLO.technical.location + "/graph";
graphLO.educational.interactivityType = "expositive";  
graphLO.educational.learningResourceType = "graph"; 
graphLO.educational.interactivityLevel = "low";  

export { graphLO };