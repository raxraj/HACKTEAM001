const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    interests: [
        {
            type: String,
            required: true
        }
    ],
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedInterest: {
        business: {
            type: Number,
            required: true,
            default: 0
        },
        entertainment: {
            type: Number,
            required: true,
            default: 0
        },
        health: {
            type: Number,
            required: true,
            default: 0
        },
        science: {
            type: Number,
            required: true,
            default: 0
        },
        sports: {
            type: Number,
            required: true,
            default: 0
        },
        technology: {
            type: Number,
            required: true,
            default: 0
        }
    },
    viewedInterest: {
        business: {
            type: Number,
            required: true,
            default: 0
        },
        entertainment: {
            type: Number,
            required: true,
            default: 0
        },
        health: {
            type: Number,
            required: true,
            default: 0
        },
        science: {
            type: Number,
            required: true,
            default: 0
        },
        sports: {
            type: Number,
            required: true,
            default: 0
        },
        technology: {
            type: Number,
            required: true,
            default: 0
        }
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    otp: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})


const userModel = mongoose.model('users', usersSchema)

module.exports = userModel
