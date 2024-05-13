const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define schema
const learningObjectSchema = new Schema({
    general: {
        title: String,
        language: [String],
        description: String,
        keyword: [String],
        structure: String,
        aggregationLevel: Number
    },
    lifecycle: {
        version: String,
        status: String,
        contribute: String
    },
    technical: {
        format: String,
        size: Number,
        location: String
    },
    educational: {
        interactivityType: String,
        learningResourceType: String,
        interactivityLevel: String,
        context: String,
        difficulty: String,
        typicalLearningTime: Number
    },
    content: {
        text: String,
        link: String,
        image: String
    }
}, {
    timestamps: true,
});

// Create model
const LearningObject = mongoose.model('LearningObject', learningObjectSchema);

module.exports = LearningObject;
