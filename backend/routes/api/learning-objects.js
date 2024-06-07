const router = require('express').Router();
let LearningObject = require('../../models/learningObject.model');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');
const calculateLOScore = require('./initialLOScore');

router.route('/').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
  await LearningObject.find()
    .then(lo => res.json(lo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addBatch').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  console.log(req.body.learningObjects);
  console.log("adding learning objects");
  let learningObjects = req.body.learningObjects; 
  
  learningObjects = learningObjects.map(lo => {
    const score = calculateLOScore(lo);
    return { ...lo, score };
  });

  console.log(learningObjects);

  try {
    const insertedLearningObjects = await LearningObject.insertMany(learningObjects);
    const learningObjectIds = insertedLearningObjects.map(lo => lo._id.toString());
    
    console.log(learningObjectIds)
    res.json({ message: 'LearningObjects added!', ids: learningObjectIds });
  } catch (err) {
    res.status(400).json({ error: 'Error: ' + err });
  }
});

router.route('/add').post(verifyRoles(ROLES_LIST.User),(req, res) => {
  console.log(req.body)
  console.log("adding learning object")
  let learningObject = req.body.learningObject;

  const score = calculateLOScore(learningObject); 
  learningObject = { ... learningObject, score};
  console.log(learningObject);

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

router.route('/batch').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || !ids.length) {
    return res.status(400).json({ error: 'Invalid or missing "ids" array' });
  }

  try {
    const learningObjects = await LearningObject.find({ _id: { $in: ids } });
    res.json(learningObjects);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching learning objects: ' + err });
  }
});

router.route('/addAudio/:id').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  const { id } = req.params;
  const { audio } = req.body;
  console.log(req.body); 

  LearningObject.findById(id)
    .then(lo => {
      if (!lo) {
        return res.status(404).json({ error: 'Learning object not found' });
      }
      lo.content.audio = audio;
      lo.save();
    })
    .then(() => 
      res.json('Audio added to the learning object'))
    .catch(err => 
      res.status(400).json({ error: 'Error adding audio to the learning object: ' + err }));
});

router.route('/addDescription/:id').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  console.log(req.body); 

  LearningObject.findById(id)
    .then(lo => {
      if (!lo) {
        return res.status(404).json({ error: 'Learning object not found' });
      }
      lo.content.text = description;
      lo.save();
    })
    .then(() => 
      res.json('Description added to the slide.'))
    .catch(err => 
      res.status(400).json({ error: 'Error adding description to slide: ' + err }));
});

router.route('/addTranscript/:id').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  const { id } = req.params;
  const { transcript } = req.body;
  console.log(req.body); 

  LearningObject.findById(id)
    .then(lo => {
      if (!lo) {
        return res.status(404).json({ error: 'Learning object not found' });
      }
      lo.content.text = transcript;
      lo.save();
    })
    .then(() => 
      res.json('Transcript added to the video.'))
    .catch(err => 
      res.status(400).json({ error: 'Error adding video transcript: ' + err }));
});


module.exports = router;