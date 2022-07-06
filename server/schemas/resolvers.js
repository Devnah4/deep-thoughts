// imports the Thought type from the typeDefs
const { User, Thought } = require('../models');

const resolvers = {
    Query: { // holds a series of Methods
        // Brings back all thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        }, 

        // Brings a thought by id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        // Brings back all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },

        // Brings back a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        }
    }
};

module.exports = resolvers;