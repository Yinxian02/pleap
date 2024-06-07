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
  const rating = req.body; 

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

// router.route('/:userID/').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
//   await Rating.find(req.params.userID)
//     .then(rating => res.json(rating))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// get batch of learning object ratings by learning object ids
router.route('/batch').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  console.log(req.body);
  const { learningObjectIds, userId } = req.body;
  
  console.log(learningObjectIds);
  console.log(userId);
  
  if (!Array.isArray(learningObjectIds) || !learningObjectIds.length) {
    return res.status(400).json({ error: 'Invalid or missing "ids" array' });
  }

  try {
    const ratings = await Rating.find({ 
      userId: userId,
      learningObjectId: { $in: learningObjectIds } 
    });
    console.log(ratings);
    res.json(ratings);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching ratings: ' + err });
  }
});

module.exports = router;