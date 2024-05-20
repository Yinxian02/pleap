const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {type: String, required: true },
  author: String,
  _learningObjects: [{ type: Schema.Types.ObjectId, ref: "LearningObject"}]
  }, {
  timestamps: true,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;