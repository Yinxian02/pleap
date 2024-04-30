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

        }
    ]
};

export const resultInitialState = {
    activeReflexive: 0,
    sensingIntuitive: 0, 
    visualVerbal: 0, 
    sequentialGlobal: 0,
}; 