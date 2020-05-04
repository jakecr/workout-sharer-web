const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
        trim: true
    },
    workout: {
        type: Number,
        required: true,
        trim: true
    },
    set: {
        type: Number,
        required: true,
        trim: true
    },
    exercise: {
        type: String,
        required: true,
        trim: true
    },
    maxType: {
        type: String,
        required: true,
        trim: true
    },
    percentMax: {
        type: String,
        trim: true
    },
    repsForAssessment: {
        type: String,
        trim: true
    },
    staticMetric: {
        type: String,
        trim: true
    },
    timePerRep: {
        type: String,
        trim: true
    },
    setRest: {
        type: String,
        required: true,
        trim: true
    },
    additionalInstructions: {
        type: String,
        required: true,
        trim: true
    }
})

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    credit: {
        type: Number,
        required: true,
        default: 0
    },
})

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    keyterms: {
        type: String,
        trim: true
    },
    workouts: [ workoutSchema ],
    creator: {
        type: String,
        required: true,
        ref: 'User'
    },
    subscribers: {
        type: Number,
        default: 0
    },
    comments: [ commentSchema ]
}, {
    timestamps: true
})

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan