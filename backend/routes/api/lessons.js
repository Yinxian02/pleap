const router = require('express').Router();
let Lesson = require('../../models/lesson.model');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
  await Lesson.find()
    .then(lessons => res.json(lessons))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(verifyRoles(ROLES_LIST.User),(req, res) => {
  console.log("adding lesson route")
  const title = req.body.lesson.title;
  // const creator = req.body.lesson.creator;
  // const age = req.body.lesson.age;
  // const number = req.body.lesson.number;
  // const durationHours = Number(req.body.lesson.durationHours);
  // const durationMins = Number(req.body.lesson.durationMins);
  // const materials = req.body.lesson.materials;
  // const instructions = req.body.lesson.instructions;
  // const youtube = req.body.lesson.youtube;
  // const picture = req.body.lesson.picture;

  const newLesson = new Lesson({
    title,
    // creator,
    // age,
    // number,
    // durationHours,
    // durationMins,
    // materials,
    // instructions,
    // youtube,
    // picture,
  });

  newLesson.save()
  .then(() => res.json('Lesson added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),(req, res) => {
  Lesson.findById(req.params.id)
    .then(lesson => res.json(lesson))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(verifyRoles(ROLES_LIST.Admin),(req, res) => {
  Lesson.findByIdAndDelete(req.params.id)
    .then(() => res.json('Lesson deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(verifyRoles(ROLES_LIST.Admin),(req, res) => {
  Lesson.findById(req.params.id)
    .then(lesson => {
      lesson.title = req.body.title;
      // lesson.creator = req.body.creator;
      // lesson.age = req.body.age;
      // lesson.number = req.body.number;
      // lesson.durationHours = Number(req.body.durationHours);
      // lesson.durationMins = Number(req.body.durationMins);
      // lesson.materials = req.body.materials;
      // lesson.instructions = req.body.instructions;
      // lesson.youtube = req.body.youtube;
      // lesson.picture = req.body.picture;

      lesson.save()
        .then(() => res.json('Lesson updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;