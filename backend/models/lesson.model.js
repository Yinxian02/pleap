const mongoose = require('mongoose');
const LearningObject = require('./learningObject.model');

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


// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const lessonSchema = new Schema({
//   title: {type: String, required: true },
//   lessonObjectives: [{type: String, required: false}],
//   // creator: {type: String, required: true},
//   // age: {type: String, required: true},
//   // number: {type: Number, required: true },
//   // durationHours: {type: Number, required: true },
//   // durationMins: {type: Number, required: true },
//   // materials: [{type: String, required: true }],
//   // instructions: [{type: String, required: true}], 
//   // youtube: {type: String, required: true},
//   // picture: {type: String, required: true}
// }, {
//   timestamps: true,
// });

// // function validatePath(fieldType) {
// //   exerciseSchema.path(fieldType).validate((val) => {
// //     urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
// //     return urlRegex.test(val);
// //   }, 'Invalid' + fieldType + 'URL.');
// // }

// // validatePath('youtube');

// const Lesson = mongoose.model('Lesson', lessonSchema);

// module.exports = Lesson;