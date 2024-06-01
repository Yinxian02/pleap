export class LearningObject {
    constructor(title, format, interactivityType, learningResourceType, interactivityLevel){
        this.title = title;
        this.format = format;

        this.interactivityType = interactivityType;
        this.learningResourceType = learningResourceType;
        this.interactivityLevel = interactivityLevel;
        this.aiGenerated = false;
        this.embed = false;
    }

    setText(text){
        this.text = text; 
    }

    setLink(link){
        this.link = link; 
    }

    setAudio(audio){
        this.audio = audio;
    }

    setQuestionnaire(questionnaire){    
        this.questionnaire = questionnaire;
    }

    setExercise(exercise){
        this.exercise = exercise;
    }

    setGlossary(glossary){
        this.glossary = glossary;
    }

    setEmbedded(){
        this.embed = true;
    }

    setAIGenerated(){
        this.aiGenerated = true;
    }

    getJSON(){
        return {
            general: {
                identifier: "",
                title: this.title, // name of learning object
                language: ["en-GB"], 
                description: "", // describe content 
                keyword: ["en"], // describe topic
                structure: "atomic", // atomic, linear, collection,  hierarchical, networked
                aggregationLevel: 1, // granularity
            },
            lifecycle: {
                version: "1.0", // edition of learning object
                status: "",  // draft, final, revised, unavailable
                contribute: "", // creation, edits, publications
            },
            technical: {
                format: this.format, // video/mpeg, application/x-toolbook, text/html
                size: 0, // in bytes
                location: "",// url
            },
            educational: {
                interactivityType: this.interactivityType, // active, expositive, mixed
                learningResourceType: this.learningResourceType, 
                interactivityLevel: this.interactivityLevel, 
                context: "higher education",
                difficulty: "",
            },
            content: {
                text: this.text,
                link: this.link,
                audio: this.audio,
                questionnaire: this.questionnaire, // choices
                exercise: this.exercise, // question and answer
                glossary: this.glossary, // term and definition
                embed: this.embed,
                aiGenerated: this.aiGenerated,
            }
        };
    }

}