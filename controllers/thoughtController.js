const { Thought, User } = require('../models');

module.exports = {
  
  getThoughts(req, res) {
    Thought.find()
      .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },
  
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThoughts(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: {thoughts: thoughtData._id} },
          {new: true }
        )
      })
      .then((userData)=> {
        return res.status(404).json({message:'No user found!'});
         
        // message if user data is correct
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  deleteThoughts(req, res) {
    // check if its thoughtId
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thoughtData) => {
        if(!thoughtData) {
          return res.status(404).json({message: 'No thought with ID'})
        }
        return User.findOneAndUpdate(
          // update username 
          {thoughts: req.params.thoughtId},
          { $pull: {thoughts: req.params.thoughtId} },
          {new: true }
        )
        
        })
      .then((userData) => {
        if(!userData) {
          return res.status(404).json({message: 'No user with ID'})
        }
        res.json({ message: 'thought deleted!' })})
      .catch((err) => res.status(500).json(err));
  },

  updateThoughts(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


