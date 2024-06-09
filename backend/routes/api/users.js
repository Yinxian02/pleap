const router = require('express').Router();
let User = require('../../models/user.model');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/').get(verifyRoles(ROLES_LIST.Admin), async (req, res) => {
    await User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get(verifyRoles(ROLES_LIST.User),(req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(verifyRoles(ROLES_LIST.User),(req, res) => {
  User.findById(req.params.id)
    .then(user => {
    console.log('req body:', req.body)
    user.learningPreferences.active = req.body.active;
    user.learningPreferences.reflexive = req.body.reflexive; 
    user.learningPreferences.sensing = req.body.sensing;
    user.learningPreferences.intuitive = req.body.intuitive;
    user.learningPreferences.visual = req.body.visual;
    user.learningPreferences.verbal = req.body.verbal;
    user.learningPreferences.sequential = req.body.sequential;
    user.learningPreferences.global = req.body.global; 
    console.log(user); 
    user.save()
    .then(() => res.json('User learning preference updated!'))
    .catch(err => res.status(400).json('Error: ' + err));

    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/learning-styles').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  console.log('Getting learning styles');
  try {
      const users = await User.find();
      const learningStyles = users.map(user => ({
          id: user._id,
          score: user.learningPreferences
      }));
      console.log(learningStyles);
      res.json(learningStyles);
  } catch (err) {
      res.status(400).json('Error: ' + err);
  }
});


module.exports = router;