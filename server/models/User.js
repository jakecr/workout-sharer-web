const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Plan = require('./Plan')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subbedPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    madePlans: {
        type: Array,
        ref: 'Plan',
        default: []
    },
    record: {
        type: Array
    },
    credit: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

userSchema.virtual('plans', {
    ref: 'Plan',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.avatar

    return userObject
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user plans when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Plan.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User