const router = require('express').Router();
let LearningObject = require('../../models/learningObject.model');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
  await LearningObject.find()
    .then(lo => res.json(lo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addBatch').post(verifyRoles(ROLES_LIST.User), (req, res) => {
  console.log(req.body.learningObjects);
  console.log("adding learning objects");
  const learningObjects = req.body.learningObjects; 

  LearningObject.insertMany(learningObjects)  
    .then(() => res.json('LearningObjects added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(verifyRoles(ROLES_LIST.User),(req, res) => {
  console.log(req.body)
  console.log("adding learning object")
  const learningObject = req.body.learningObject;

  const newLearningObject = new LearningObject(learningObject);

  newLearningObject.save()
  .then(() => res.json('LearningObject added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(verifyRoles(ROLES_LIST.User),(req, res) => {
  LearningObject.findById(req.params.id)
    .then(lesson => res.json(lesson))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;