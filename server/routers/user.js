const express = require('express')
const User = require('../models/User')
const Plan = require('../models/Plan')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { sendWelcomeEmail, sendChangePasswordEmail, sendCancelationEmail, sendMeEmail } = require('../emails/account')
const router = new express.Router()

router.post('/change-password', async (req, res) => {
    const { email } = req.body

    try {
        const ifUser = await User.findOne({ email })
        if(!ifUser){
            return res.send({ error: 'Could not find an account with that email!' })
        }

        encodedCorrectCode = await bcrypt.hash(sendChangePasswordEmail(email) + process.env.BCRYPT_SECRET, 8)
        res.status(202).send({ encodedCorrectCode, email })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/delete-user', async (req, res) => {
    const { token } = req.body
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        const encodedCorrectCode = await bcrypt.hash(sendCancelationEmail(user.email, user.username) + process.env.BCRYPT_SECRET, 8)
        
        res.status(202).send({ encodedCorrectCode })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/get-user', async (req, res) => {
    const { token, username } = req.body
    
    try {
        let user
        if(token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            user = await User.findById(decoded.userId)
        }else if(username) {
            user = await User.findOne({ username })
        }
        if(!user) {
            return res.status(203).send({ error: 'Could not find user' })
        }
        
        let madePlans = []
        for(let i = 0; i < user.madePlans.length; i++) {
            let plan = await Plan.findById(user.madePlans[i])
            if(plan) {
                madePlans.push({ name: plan.name, subscribers: plan.subscribers, _id: plan._id })
            }
        }

        res.status(202).send({ user: { username: user.username, credit: user.credit }, plans: madePlans })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/send-email', (req, res) => {
    const { email, subject, content } = req.body

    try {
        sendMeEmail(email, subject, content)
        res.status(200).send()
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.findByCredentials(email, password)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

        res.status(202).send({ token })
    }catch(err) {
        res.status(203).send({ error: 'Make sure you have the correct email and password.' })
    }
})

router.post('/signup', async (req, res) => {
    const { username, email } = req.body

    try {
        const ifSameEmail = await User.findOne({ email })
        const ifSameUsername = await User.findOne({ username })

        if(ifSameEmail) {
            return res.send({ error: 'There is already an account with that email!' })
        }
        else if(ifSameUsername) {
            return res.send({ error: 'There is already an account with that username!' })
        }
        
        const encodedCorrectCode = await bcrypt.hash(sendWelcomeEmail(email, username) + process.env.BCRYPT_SECRET, 8)
        res.status(202).send({ encodedCorrectCode })
    }catch(err) {
        res.status(500).send()
    }
}) 

router.post('/validate-user', async (req, res) => {
    const { token } = req.body
    
    try {
        if(!token) {
            return res.send({ isLoggedIn: false })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if(!user) {
            return res.send({ isLoggedIn: false })
        }
        
        res.status(202).send({ isLoggedIn: true })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/verify-delete-user', async (req, res) => {
    const { token, code, encodedCorrectCode } = req.body
    
    try {
        const ifCorrectCode = await bcrypt.compare(code.toString() + process.env.BCRYPT_SECRET, encodedCorrectCode)
        if(!ifCorrectCode) {
            return res.status(203).send({ error: 'Make sure your code is correct.' })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account' })
        }

        for(let i = 0; i < user.madePlans.length; i++) {
            let plan = await Plan.findById(user.madePlans[i])
            if(plan) {
                const users = User.find({ subbedPlan: plan._id })
                for(let j = 0; j < users.length; j++) {
                    users[i].record = []
                    users[i].subbedPlan = null
                    users[i].save()
                }

                await plan.remove()
            }
        }

        await user.remove()

        res.status(200).send()
    } catch (err) {
        res.status(500).send()
    }
})

router.post('/verify-password', async (req, res) => {
    const { code, password, encodedCorrectCode, email } = req.body
    
    try {
        const ifCorrectCode = await bcrypt.compare(code.toString() + process.env.BCRYPT_SECRET, encodedCorrectCode)
        if(!ifCorrectCode) {
            return res.status(203).send({ error: 'Make sure your code is correct.' })
        }
        
        const user = await User.findOne({ email })
        if(!user) {
            return res.send({ error: 'Make sure your email is correct.' })
        }

        const newPassword = await bcrypt.hash(password, 8)

        await User.updateOne(user, { $set: { password: newPassword } })
        res.status(200).send()
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/verify-user', async (req, res) => {
    const { username, email, password, code, encodedCorrectCode } = req.body

    try {
        const ifCorrectCode = await bcrypt.compare(code.toString() + process.env.BCRYPT_SECRET, encodedCorrectCode)
        if(!ifCorrectCode) {
            return res.status(203).send({ error: 'Make sure you give the correct code.' })
        }

        const user = new User({ email, password, username })
        await user.save()
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.status(202).send({ token })
    }catch(err) {
        res.status(500).send()
    }
})

module.exports = router