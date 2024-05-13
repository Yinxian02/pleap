export const learningObject = {
    general: {
        identifier: "",
        title: "", // name of learning object
        language: ["en-GB"], 
        description: "", // describe content 
        keyword: ["en"], // describe topic
        structure: "", // atomic, linear, collection,  hierarchical, networked
        aggregationLevel: 0, // granularity
    },
    lifecycle: {
        version: "1.0", // edition of learning object
        status: "",  // draft, final, revised, unavailable
        contribute: "", // creation, edits, publications
    },
    technical: {
        format: "", // video/mpeg, application/x-toolbook, text/html
        size: 0, // in bytes
        location: "",// url
    },
    educational: {
        interactivityType: "", // active, expositive, mixed
        learningResourceType: "", 
        interactivityLevel: "", 
        context: "higher education",
        difficulty: "",
    },
    content: {
        text: "",
        link: "",
        image: ""
    }
};