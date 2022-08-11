const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  removeFriend,
  updateUser,
  addFriend,
  deleteUser,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
// add an update route.... .put

// /api/students/:studentId/assignments
router.route('/:userId/friend/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;
