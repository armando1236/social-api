const { thought, user } = require('../models');

module.exports = {

getThoughts(req, res) {
  Thought.find()
  .then((courses) => res.json(courses))
  .catch((err) => res.status(500).json(err));
},

getThoughtById(req, res) {
  Thought.findOne({ _id: req.params.id })
  .select('-__v')
  .then((thoughtData) =>
  !thoughtData
  ? res.status(404).json({ message: 'No thought with that ID' })
  : res.json(course)
  )
  .catch((err) => res.status(500).json(err));
},

createThought(req, res) {
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
    Thought.findOneAndDelete({ _id: req.params.id })
    .then((thoughtData) => {
      if(!thoughtData) {
        return res.status(404).json({message: 'No thought with ID'})
      }
      return User.findOneAndUpdate(
        // update username 
        {thoughts: req.params.username},
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
          .then((thoughtData) =>
          !thoughtData
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
        },

        createReaction(req, res) {
          Reaction.create(req.body)
          .then((thoughtData) => {
            return Thought.findOneAndUpdate(
              { _id: req.body.thoughtId },
              { $push: {reactions: body} },
              {new: true }
              )
            })
            .then((thoughtData)=> {
              !thoughtData
              return res.status(404).json({message:'No reaction found!'});
              
      
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
          },

          removeReaction(req, res) {
            Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull:{reactions:{reactionId: params.reactionId}} },
              { new: true }
              )
              .then((thoughtData) =>
              !thoughtData
              ? res.status(404).json({ message: 'No reaction with this id!' })
              : res.json(thoughtData)
              )
              .catch((err) => res.status(500).json(err));
            },

          };
    


      
        
        