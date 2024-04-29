const router = require('express').Router();
let Exercise = require('../../models/exercise.model');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/').get(verifyRoles(ROLES_LIST.Admin), async (req, res) => {
  await Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),(req, res) => {
  const title = req.body.exercise.title;
  const creator = req.body.exercise.creator;
  const age = req.body.exercise.age;
  const number = req.body.exercise.number;
  const durationHours = Number(req.body.exercise.durationHours);
  const durationMins = Number(req.body.exercise.durationMins);
  const materials = req.body.exercise.materials;
  const instructions = req.body.exercise.instructions;
  const youtube = req.body.exercise.youtube;
  const picture = req.body.exercise.picture;

  const newExercise = new Exercise({
    title,
    creator,
    age,
    number,
    durationHours,
    durationMins,
    materials,
    instructions,
    youtube,
    picture,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),(req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(verifyRoles(ROLES_LIST.Admin),(req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(verifyRoles(ROLES_LIST.Admin),(req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.title = req.body.title;
      exercise.creator = req.body.creator;
      exercise.age = req.body.age;
      exercise.number = req.body.number;
      exercise.durationHours = Number(req.body.durationHours);
      exercise.durationMins = Number(req.body.durationMins);
      exercise.materials = req.body.materials;
      exercise.instructions = req.body.instructions;
      exercise.youtube = req.body.youtube;
      exercise.picture = req.body.picture;

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;