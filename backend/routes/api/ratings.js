const router = require('express').Router();
let Rating = require('../../models/rating.model');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

// router.route('/').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
//   await Rating.find()
//     .sort({ createdAt: 1 })
//     .then(rating => res.json(rating))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add').post(verifyRoles(ROLES_LIST.User),(req, res) => {
  console.log(req.body)
  console.log("adding rating")
  const rating = req.body.rating; 

  const newRating = new Rating(rating);

  newRating.save()
  .then(() => res.json('Lesson added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addBatch').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  console.log(req.body)
  console.log("adding ratings")
  const ratings = req.body.ratings; 

  await Rating.insertMany(ratings)
  .then(() => res.json('Ratings added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userID').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
  await Rating.find(req.params.userID)
    .then(rating => res.json(rating))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;