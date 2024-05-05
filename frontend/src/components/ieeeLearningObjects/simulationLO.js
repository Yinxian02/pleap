import { learningObject as learningObjectTemplate } from './learningObject.js';

const simulationLO = { ...learningObjectTemplate };

simulationLO.general.structure = "atomic";
simulationLO.general.aggregationLevel = 1; 
simulationLO.technical.format = "html";
simulationLO.technical.location = exerciseLO.technical.location + "/simulation";
simulationLO.educational.interactivityType = "active"; // controls data
simulationLO.educational.learningResourceType = "simulation"; 
simulationLO.educational.interactivityLevel = "high"; // written set of instructions that solicit activity

simulationLO.learningPreferencesValues.activeReflexive = 0;
simulationLO.learningPreferencesValues.sensingIntuitive = 0;
simulationLO.learningPreferencesValues.visualVerbal = 0;
simulationLO.learningPreferencesValues.sequentialGlobal = 0;

export { simulationLO };