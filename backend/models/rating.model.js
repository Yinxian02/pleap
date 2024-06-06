const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    learningObjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningObject' },
    rating: { type: Number, required: true }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;