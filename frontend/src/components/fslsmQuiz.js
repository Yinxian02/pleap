export const Dimension = {
    ActiveReflexive: "activeReflexive",
    SensingIntuitive: "sensingIntuitive",
    VisualVerbal: "visualVerbal",
    SequentialGlobal: "sequentialGlobal",
}; 

export const fslsmQuiz = {
    questions: [
        {
            question: "I understand something better after I", 
            dimension: Dimension.ActiveReflexive, 
            choices: [
                { text: "try it out.", value: true }, // -1
                { text: "think it through.", value: false } // +1
            ], 
        }, 
        {
            question: "I would rather be considered", 
            dimension: Dimension.SensingIntuitive, 
            choices: [
                { text: "realistic.", value: true }, // +1
                { text: "innovative.", value: false } // -1
            ], 
        }, 
        {
            question: "When I think about what I did yesterday, I am most likely to get", 
            dimension: Dimension.VisualVerbal, 
            choices: [
                { text: "a picture.", value: true }, // +1
                { text: "words.", value: false } // -1
            ], 
        }, 
        {
            question: "I tend to", 
            dimension: Dimension.SequentialGlobal, 
            choices: [
                { text: "understand details of a subject but may be fuzzy about its overall structure.", value: true }, // +1
                { text: "understand the overall structure but may be fuzzy about details.", value: false } // -1
            ], 
        }, 
        {
            question: "When I am learning something new, it helps me to", 
            dimension: Dimension.ActiveReflexive, 
            choices: [
                { text: "talk about it.", value: true }, // +1
                { text: "think about it.", value: false } // -1
            ], 
        },
        {
            question: "If I were a teacher, I would rather teach a course", 
            dimension: Dimension.SensingIntuitive, 
            choices: [
                { text: "that deals with facts and real life situations.", value: true }, // +1
                { text: "that deals with ideas and theories.", value: false } // -1
            ], 
        },
        {
            question: "I prefer to get new information in", 
            dimension: Dimension.VisualVerbal, 
            choices: [
                { text: "pictures, diagrams, graphs, or maps.", value: true }, // +1
                { text: "written directions or verbal information.", value: false } // -1
            ], 
        },
        {
            question: "Once I understand", 
            dimension: Dimension.SequentialGlobal, 
            choices: [
                { text: "all the parts, I understand the whole thing.", value: true }, // +1
                { text: "the whole thing, I see how the parts fit.", value: false } // -1
            ], 
        },
        {
            question: "In a study group working on difficult material, I am more likely to",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "Jump in and contribute ideas.", value: true},
                {text: "Sit back and listen.", value: false}
            ]
        },
        {
            question: "I find it easier",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "To learn facts.", value: true},
                {text: "To learn concepts.", value: false}
            ]
        },
        {
            question: "In a book with lots of pictures and charts, I am likely to",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "Look over the pictures and charts carefully.", value: true},
                {text: "Focus on the written text.", value: false}
            ]
        },
        {
            question: "When I solve math problems",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "I usually work my way to the solutions one step at a time.", value: true},
                {text: "I often just see the solutions but then have to struggle to figure out the steps to get to them.", value: false}
            ]
        }, 
        {
            question: "In classes I have taken",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "I have usually gotten to know many of the students.", value: true},
                {text: "I have rarely gotten to know many of the students.", value: false}
            ]
        },
        {
            question: "In reading nonfiction, I prefer",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "Something that teaches me new facts or tells me how to do something.", value: true},
                {text: "Something that gives me new ideas to think about.", value: false}
            ]
        },
        {
            question: "I like teachers",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "Who put a lot of diagrams on the board.", value: true},
                {text: "Who spend a lot of time explaining.", value: false}
            ]
        },
        {
            question: "When I'm analyzing a story or a novel",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "I think of the incidents and try to put them together to figure out the themes.", value: true},
                {text: "I just know what the themes are when I finish reading and then I have to go back and find the incidents that demonstrate them.", value: false}
            ]
        },
        {
            question: "When I start a homework problem, I am more likely to",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "Start working on the solution immediately.", value: true},
                {text: "Try to fully understand the problem first.", value: false}
            ]
        },
        {
            question: "I prefer the idea of",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "Certainty.", value: true},
                {text: "Theory.", value: false}
            ]
        },
        {
            question: "I remember best",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "What I see.", value: true},
                {text: "What I hear.", value: false}
            ]
        },
        {
            question: "It is more important to me that an instructor",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "Lay out the material in clear sequential steps.", value: true},
                {text: "Give me an overall picture and relate the material to other subjects.", value: false}
            ]
        },
        {
            question: "I prefer to study",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "In a study group.", value: true},
                {text: "Alone.", value: false}
            ]
        },
        {
            question: "I am more likely to be considered",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "Careful about the details of my work.", value: true},
                {text: "Creative about how to do my work.", value: false}
            ]
        },
        {
            question: "When I get directions to a new place, I prefer",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "A map.", value: true},
                {text: "Written instructions.", value: false}
            ]
        },
        {
            question: "I learn",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "At a fairly regular pace. If I study hard, I'll 'get it.'", value: true},
                {text: "In fits and starts. I'll be totally confused and then suddenly it all 'clicks.'", value: false}
            ]
        },
        {
            question: "I would rather first",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "Try things out.", value: true},
                {text: "Think about how I'm going to do it.", value: false}
            ]
        },
        {
            question: "When I am reading for enjoyment, I like writers to",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "Clearly say what they mean.", value: true},
                {text: "Say things in creative, interesting ways.", value: false}
            ]
        },
        {
            question: "When I see a diagram or sketch in class, I am most likely to remember",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "The picture.", value: true},
                {text: "What the instructor said about it.", value: false}
            ]
        },
        {
            question: "When considering a body of information, I am more likely to",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "Focus on details and miss the big picture.", value: true},
                {text: "Try to understand the big picture before getting into the details.", value: false}
            ]
        },
        {
            question: "I more easily remember",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "Something I have done.", value: true},
                {text: "Something I have thought a lot about.", value: false}
            ]
        },
        {
            question: "When I have to perform a task, I prefer to",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "Master one way of doing it.", value: true},
                {text: "Come up with new ways of doing it.", value: false}
            ]
        },
        {
            question: "When someone is showing me data, I prefer",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "Charts or graphs.", value: true},
                {text: "Text summarizing the results.", value: false}
            ]
        },
        {
            question: "When writing a paper, I am more likely to",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "Work on (think about or write) the beginning of the paper and progress forward.", value: true},
                {text: "Work on (think about or write) different parts of the paper and then order them.", value: false}
            ]
        },
        {
            question: "When I have to work on a group project, I first want to",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "Have 'group brainstorming' where everyone contributes ideas.", value: true},
                {text: "Brainstorm individually and then come together as a group to compare ideas.", value: false}
            ]
        },
        {
            question: "I consider it higher praise to call someone",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "Sensible.", value: true},
                {text: "Imaginative.", value: false}
            ]
        },
        {
            question: "When I meet people at a party, I am more likely to remember",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "What they looked like.", value: true},
                {text: "What they said about themselves.", value: false}
            ]
        },
        {
            question: "When I am learning a new subject, I prefer to",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "Stay focused on that subject, learning as much about it as I can.", value: true},
                {text: "Try to make connections between that subject and related subjects.", value: false}
            ]
        },
        {
            question: "I am more likely to be considered",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "Outgoing.", value: true},
                {text: "Reserved.", value: false}
            ]
        },
        {
            question: "I prefer courses that emphasize",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "Concrete material (facts, data).", value: true},
                {text: "Abstract material (concepts, theories).", value: false}
            ]
        },
        {
            question: "For entertainment, I would rather",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "Watch television.", value: true},
                {text: "Read a book.", value: false}
            ]
        },
        {
            question: "Some teachers start their lectures with an outline of what they will cover. Such outlines are",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "Somewhat helpful to me.", value: true},
                {text: "Very helpful to me.", value: false}
            ]
        },
        {
            question: "The idea of doing homework in groups, with one grade for the entire group,",
            dimension: Dimension.ActiveReflexive,
            choices: [
                {text: "Appeals to me.", value: true},
                {text: "Does not appeal to me.", value: false}
            ]
        },
        {
            question: "When I am doing long calculations,",
            dimension: Dimension.SensingIntuitive,
            choices: [
                {text: "I tend to repeat all my steps and check my work carefully.", value: true},
                {text: "I find checking my work tiresome and have to force myself to do it.", value: false}
            ]
        },
        {
            question: "I tend to picture places I have been",
            dimension: Dimension.VisualVerbal,
            choices: [
                {text: "Easily and fairly accurately.", value: true},
                {text: "With difficulty and without much detail.", value: false}
            ]
        },
        {
            question: "When solving problems in a group, I would be more likely to",
            dimension: Dimension.SequentialGlobal,
            choices: [
                {text: "Think of the steps in the solution process.", value: true},
                {text: "Think of possible consequences or applications of the solution in a wide range of areas.", value: false}
            ]
        }
    ]
};

export const resultInitialState = {
    activeReflexive: 0,
    sensingIntuitive: 0, 
    visualVerbal: 0, 
    sequentialGlobal: 0,
}; 

