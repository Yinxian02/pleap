import { learningObject } from "../../learningObject";

const courseSummaryLO = {...learningObject}

courseSummaryLO.general.title = "Introduction to the Course";
courseSummaryLO.general.structure = "atomic";
courseSummaryLO.general.aggregationLevel = 1;

courseSummaryLO.technical.format = "text";

courseSummaryLO.educational.interactivityType = "expositive"
courseSummaryLO.educational.learningResourceType = "problem statement"
courseSummaryLO.educational.interactivityLevel = "low"

courseSummaryLO.content.text = "As this is our first lesson together, I have prepared a set of short and hopefully fun videos for this lesson to whet your programming appetite. So you can sit back and enjoy this lesson. \n In future lessons, you will actually be more hands-on and do things yourself! \n In this first lesson, we will focus on the programming part of the course, which is as important as the Python part. In fact, it might even be more important in the longer term. I know you cannot wait to sink your teeth into Python… but please be patient and stick with me for now. We will get to Python by the end of the lesson, I promise! \n In this lesson, I will be presenting programming from a Computer Science perspective, which may be quite different from how you learnt programming. I will concentrate on the big picture and the core ideas behind programming. It might all seem a bit basic to you but it is quite an important topic. So please, stick with me! \n Many programming tutorials that you may find online actually focus on teaching you how to code in Python, rather than teaching you important programming concepts. But I do not want you to just be some wannabe Python coder. I want you to be well-rounded programmers! Hopefully this course will achieve that! Ok, let\’s not waste any more time. On with our lesson!"

export { courseSummaryLO };
