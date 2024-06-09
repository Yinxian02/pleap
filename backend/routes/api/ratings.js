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
  .then(() => res.json('Rating saved to database!'))
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

// router.route('/:id').get(verifyRoles(ROLES_LIST.User), async (req, res) => {
//   await Rating.find(req.params.id)
//     .then(rating => 
//       {console.log(rating); 
//       res.json(rating)})
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// get batch of learning object ratings by learning object ids
router.route('/user').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  
  // console.log(learningObjectIds);
  console.log(userId);
  
  // if (!Array.isArray(learningObjectIds) || !learningObjectIds.length) {
  //   return res.status(400).json({ error: 'Invalid or missing "ids" array' });
  // }

  try {
    const ratings = await Rating.find({ 
      userId: userId,
      // learningObjectId: { $in: learningObjectIds } 
    });
    console.log(ratings);
    res.json(ratings);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching ratings: ' + err });
  }
});

// get learning object ratings by learning object id
router.route('/learning-object').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
  console.log(req.body);
  const { learningObjectId } = req.body;
  
  console.log(learningObjectId);
  
  try {
    const ratings = await Rating.find({ 
      learningObjectId: learningObjectId 
    });
    console.log(ratings);
    res.json(ratings);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching ratings: ' + err });
  }
});

module.exports = router;