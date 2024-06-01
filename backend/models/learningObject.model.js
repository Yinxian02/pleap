const { text } = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const choiceSchema = new Schema({
    text: { type: String, required: true },
    value: { type: Number, required: true }
});

const questionnaireSchema = new Schema({
    question: { type: String, required: true },
    choices: { type: [choiceSchema], required: true }
});

const exerciseSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const glossarySchema = new Schema({
    term: { type: String, required: true },
    definition: { type: String, required: true }
});

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
        audio: String,
        questionnaire: { type: [questionnaireSchema], required: true },
        exercise: { type: [exerciseSchema], required: true },
        glossary: { type: [glossarySchema], required: true },
        aiGenerated: { type: Boolean, default: false }
    }
}, {
    timestamps: true,
});

// Create model
const LearningObject = mongoose.model('LearningObject', learningObjectSchema);

module.exports = LearningObject;
