const router = require('express').Router();
let Lesson = require('../../models/lesson.model');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
  await Lesson.find()
    .sort({ createdAt: 1 })
    .then(lessons => res.json(lessons))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(verifyRoles(ROLES_LIST.User),(req, res) => {
  console.log(req.body)
  console.log("adding lesson route")
  const lesson = req.body.lesson; 

  const newLesson = new Lesson(lesson);

  newLesson.save()
  .then(() => res.json('Lesson added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(verifyRoles(ROLES_LIST.User),(req, res) => {
  Lesson.findById(req.params.id)
    .then(lesson => res.json(lesson))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addLearningObjects/:id').post(verifyRoles(ROLES_LIST.User),(req, res) => {
  Lesson.findById(req.params.id)
    .then(lesson => {
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        lesson._learningObjects.push(...req.body.learningObjectsIDs);
        
        lesson.save();
    })
    .then(() => 
      res.json('Learning objects references added to the lesson'))
    .catch(err => 
      res.status(400).json({ error: 'Error adding learning objects to the lesson: ' + err }));
});

module.exports = router;
