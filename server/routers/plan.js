const express = require('express')
const Plan = require('../models/Plan')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const router = new express.Router()

router.post('/check-if-made-plan', async (req, res) => {
    const { token } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        if(user.madePlans.length == 0) {
            res.status(200).send({ ifMadePlan: false })
        }
        else {
            res.status(200).send({ ifMadePlan: true })
        }
    }
    catch(err) {
        res.status(500).send()
    }
})

router.post('/check-plan-name', async (req, res) => {
    const { name } = req.body

    try {
        const ifPlan = await Plan.findOne({ name })
        if(ifPlan) {
            return res.send({ error: 'There is already a plan with that name.' })
        }

        res.status(200).send()
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/create-plan', async (req, res) => {
    const { token, name, description, keyterms, workouts } = req.body
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        const plan = new Plan({ name, description, keyterms, workouts, creator: user.username })
        user.madePlans.push(plan._id)
        
        await plan.save()
        await user.save()
        
        res.status(200).send()
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/delete-comment', async (req, res) => {
    const { planId, commentId, token } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }
        
        const plan = await Plan.findById(planId)
        if(plan.creator !== user.username) {
            return res.status(203).send({ error: 'You didn\'t make this plan.' })
        }
        
        let commenter = null
        for(let i = 0; i < plan.comments.length; i++) {
            if(plan.comments[i]._id.equals(commentId)) {
                commenter = await User.findOne({ username: plan.comments[i].user })
                plan.comments.splice(i, 1)
                break
            }
        }
        if(commenter) {
            commenter.credit -= 5
            await commenter.save()
        }
        await plan.save()

        res.status(202).send({ comments: plan.comments })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/delete-plan', async (req, res) => {
    const { token, id } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        for(let i = 0; i < user.madePlans.length; i++){
            if(user.madePlans[i] == id){
                user.madePlans.splice(i, 1)

                user.credit--
                await user.save()
                
                break
            }
            if(i == user.madePlans.length - 1) {
                return res.status(203).send({ error: 'Could not find the plan.' })
            }
        }

        let users = await User.find({ subbedPlan: id })
        for(let i = 0; i < users.length; i++){
            users[i].record = []
            users[i].subbedPlan = null
            await users[i].save()
        }

        const plan = await Plan.findById(id)
        if(!plan) {
            return res.send({ error: 'Could not find this plan.' })
        }

        await plan.remove()

        let madePlans = []
        for(let i = 0; i < user.madePlans.length; i++) {
            let plan = await Plan.findById(user.madePlans[i])
            if(plan) {
                madePlans.push({ name: plan.name, subscribers: plan.subscribers, _id: plan._id })
            }
        }

        res.status(202).send({ plans: madePlans })
    } catch (err) {
        res.status(500).send()
    }
})

router.post('/get-plan', async (req, res) => {
    const { token, id } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        const plan = await Plan.findById(id)
        if(!plan) {
            return res.send({ error: 'Could not find this plan.' })
        }

        plan.comments.sort((a, b) => b.credit - a.credit)
        await plan.save()

        let isCreator = false
        for(let i = 0; i < user.madePlans.length; i++) {
            if(user.madePlans[i].equals(plan._id)) {
                isCreator = true
            }
        }
        
        res.status(202).send({ plan, isSubscribed: user.subbedPlan == id, comments: plan.comments, isCreator })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/get-general-plan', async (req, res) => {
    const { token } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        const plan = await Plan.findById(user.subbedPlan)
        if(!plan) {
            return res.send({ plan: null, record: [] })
        }
        else if(user.record){
            res.status(202).send({ plan, record: user.record })
        }else {
            res.status(202).send({ plan, record: [] })
        }
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/post-comment', async (req, res) => {
    const { token, comment, id } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        const plan = await Plan.findById(id)
        if(!plan) {
            return res.send({ error: 'Could not find this plan.' })
        }

        plan.comments.push({ user: user.username, text: comment, credit: user.credit })
        await plan.save()

        res.status(200).send()
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/post-record', async (req, res) => {
    const { token, record } = req.body
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        user.record = record
        await user.save()

        res.status(200).send()
    }
    catch(err) {
        res.status(500).send()
    }
})

router.post('/search-plans', async (req, res) => {
    const { searchTerms, organization } = req.body

    try {
        const plans = await Plan.find( {} )
        const searchTermsArray = searchTerms.trim().toLowerCase().split(" ")

        let requestedPlans
        if(!searchTerms.trim()) {
            requestedPlans = plans
        }
        else {
            let fullPlans = plans.filter((plan) => {
                let doesntMatch = searchTermsArray.some((term) => {
                    return !plan.keyterms.includes(term)
                })
                
                if(doesntMatch) {
                    return false
                }
                return true
            })
            requestedPlans = fullPlans.map((plan) => (
                { 
                    name: plan.name, 
                    creator: plan.creator,
                    subscribers: plan.subscribers, 
                    _id: plan._id
                }
            ))
        }
        
        if(requestedPlans.length == 0) {
            return res.send({ error: 'No plans matched that search.' })
        }

        if(organization == "most") {
            requestedPlans.sort((a, b) => b.subscribers - a.subscribers)
        }
        else {
            requestedPlans.sort((a, b) => a.subscribers - b.subscribers)
        }
        
        res.status(202).send({ plans: requestedPlans })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/subscribe', async (req, res) => {
    const { id, token } = req.body
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }

        const plan = await Plan.findById(id)
        if(!plan) {
            return res.send({ error: 'Could not find this plan.' })
        }

        const planCreator = await User.findOne({ username: plan.creator })
        if(!planCreator) {
            return res.send({ error: 'Could not find this plans creator.' })
        }

        if(user.subbedPlan) {
            const prevPlan = await Plan.findById(user.subbedPlan)
            prevPlan.subscribers--
            await prevPlan.save()
        }

        user.subbedPlan = id
        user.record = []
        await user.save()
        
        plan.subscribers++
        await plan.save()

        planCreator.credit++
        await planCreator.save()

        res.status(200).send({ plan })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/unsubscribe', async (req, res) => {
    const { token } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(203).send({ error: 'Could not find your account.' })
        }
        
        const plan = await Plan.findById(user.subbedPlan)
        if(!plan) {
            return res.send({ error: 'Could not find the plan you\'re subscribed to.' })
        }

        const planCreator = await User.findOne({ username: plan.creator })
        if(!planCreator) {
            return res.send({ error: 'Could not find this plans creator.' })
        }

        user.subbedPlan = undefined
        user.record = []
        await user.save()

        plan.subscribers--
        await plan.save()
        
        planCreator.credit--
        await planCreator.save()

        res.status(200).send()
    }catch(err) {
        res.status(500).send()
    }
})

module.exports = router