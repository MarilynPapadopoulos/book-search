const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -Password')
                .populate('savedBooks')

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log({args});
            const user = await User.create(args).catch(console.error);
            console.log("created user")
            if(!user) {
                throw new AuthenticationError('Something went wrong!')
            }
            console.log('signing token')                                  
            const token = signToken(user);
            console.log('returning user', {token, user})
            return { token, user };
            
        },
        login: async (parent, { email, password }) => {
            console.log(email)
            const user = await User.findOne({email});
           
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }
            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('Wrong password!')
            }
            const token = signToken(user);
            return { token, user}
        },
        saveBook: async (parent,  bookId , context) => {
            //console.log(context.user, bookId)
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookId }},
                    { new: true}
                )//.populate('savedBooks');
               return updatedUser;
            }
            throw new AuthenticationError('Something went wrong');
        //     const updatedUser = await User.findOneAndUpdate(
        //         { _id: context.user._id },
        //         { $addToSet: { savedBooks: bookId }},
        //         { new: true}
        //     )//.populate('savedBooks');
        //    return updatedUser;
        },
        removeBook: async (parent,  bookId , context) => {
            console.log(context.user, bookId)
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: bookId }},
                { new: true}
            )//.populate('savedBooks');
            return updatedUser;
            throw new AuthenticationError('Something went wrong');
        }
    }
}

module.exports = resolvers;