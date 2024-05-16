export class LearningObject {
    constructor(title, format, interactivityType, learningResourceType, interactivityLevel, content){
        this.title = title;
        this.format = format;
        this.interactivityType = interactivityType;
        this.learningResourceType = learningResourceType;
        this.interactivityLevel = interactivityLevel;
        this.content = ""
        if (this.format === "text/plain"){
            this.text = content
        }
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
            image: this.image
        }
    };
    }

}