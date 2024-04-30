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
                { text: "try it out.", value: true }, // +1
                { text: "think it through.", value: false } // -1
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
    ]
};



export const resultInitialState = {
    activeReflexive: 0,
    sensingIntuitive: 0, 
    visualVerbal: 0, 
    sequentialGlobal: 0,
}; 