import { learningObject as learningObjectTemplate } from './learningObject.js';

const exerciseLO = { ...learningObjectTemplate };

exerciseLO.general.structure = "atomic";
exerciseLO.general.aggregationLevel = 1; 
exerciseLO.technical.format = "text";
exerciseLO.technical.location = exerciseLO.technical.location + "/exercise";
exerciseLO.educational.interactivityType = "active"; // exercise - find solution
exerciseLO.educational.learningResourceType = "exercise"; 
exerciseLO.educational.interactivityLevel = "low"; // written set of instructions that solicit activity

export { exerciseLO };
