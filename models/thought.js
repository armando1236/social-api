const{Schema, model, Types} = require('mongoose');
const dateFormat = require()


const thoughtSchema= new Schema(
  {
    thoughtText:{
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createAtval => dateFormat(createAtval)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionsSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction.length;
});

const Thoughts = model('Thoughts, thoughtSchema');