export class LearningObject {
    constructor(title, format, interactivityType, learningResourceType, interactivityLevel){
        this.title = title;
        this.format = format;

        this.interactivityType = interactivityType;
        this.learningResourceType = learningResourceType;
        this.interactivityLevel = interactivityLevel;
        
        this.text = "";
        this.link = "";
        // this.audio = "";

        // this.questionnaire = [];
        // this.exercise = [];
        // this.glossary = [];
        
        this.embed = false;
        this.aiGenerated = false;
    }

    setText(text){
        this.text = text; 
    }

    setLink(link){
        this.link = link; 
    }

    setAudio(openAIAudio, vertexAIAudio){
        this.openAIAudio = openAIAudio;
        this.vertexAIAudio = vertexAIAudio;
    }

    setImage(image){
        this.image = image;
    }

    setVideo(video){
        this.video = video;
    }

    setQuestionnaire(openAIQuestionnaire, vertexAIQuestionnaire){    
        this.openAIQuestionnaire = openAIQuestionnaire;
        this.vertexAIQuestionnaire = vertexAIQuestionnaire;
    }

    setExercise(openAIExercise, vertexAIExercise){
        this.openAIExercise = openAIExercise;
        this.vertexAIExercise = vertexAIExercise;
    }

    setGlossary(openAIGlossary, vertexAIGlossary){
        this.openAIGlossary = openAIGlossary;
        this.vertexAIGlossary = vertexAIGlossary;
    }

    setChallenge(openAIChallenge, vertexAIChallenge){
        this.openAIChallenge = openAIChallenge;
        this.vertexAIChallenge = vertexAIChallenge;
    }

    setTranscript(openAITranscript, vertexAITranscript){
        this.openAITranscript = openAITranscript;
        this.vertexAITranscript = vertexAITranscript;
    }

    setDescription(openAIDescription, vertexAIDescription){
        this.openAIDescription = openAIDescription;
        this.vertexAIDescription = vertexAIDescription;
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
                audio: {
                    openAI: this.openAIAudio,
                    vertexAI: this.vertexAIAudio
                },
                image: this.image,
                video: this.video,
                questionnaire: {
                    openAI: this.openAIQuestionnaire, // choices
                    vertexAI: this.vertexAIQuestionnaire
                },
                exercise: {
                    openAI: this.openAIExercise, // question and answer
                    vertexAI: this.vertexAIExercise
                },
                glossary: {
                    openAI: this.openAIGlossary, // term and definition
                    vertexAI: this.vertexAIGlossary
                },
                challenge: {
                    openAI: this.openAIChallenge, // problem statement
                    vertexAI: this.vertexAIChallenge
                },  
                transcript: {
                    openAI: this.openAITranscript, // text
                    vertexAI: this.vertexAITranscript
                },
                description: {
                    openAI: this.openAIDescription, // text
                    vertexAI: this.vertexAIDescription
                },
                embed: this.embed,
                aiGenerated: this.aiGenerated,
            }
        };
    }

}