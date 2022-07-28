const router = require('express').Router();
const {
  getThoughts,
  createThoughts,
  getThoughtById,
  updateThoughts,
  deleteThoughts,
  createReaction,
  removeReaction
  
} = require('../../controllers/thoughtController');



// /api/courses
router.route('/').get(getThoughts).post(createThoughts);

// /api/courses/:courseId
router.route('/:thoughtId')
  .get(getThoughtById)
  // same for userRoute.put
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;
