require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const planRouter = require('./routers/plan')
const cors = require('cors')
const path = require('path')
const publicPath = path.join(__dirname, '..', 'public')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use(userRouter)
app.use(planRouter)


app.use(express.static(publicPath))

app.get('*', (req, res) => {
    if(window.location.hostname == 'workout-sharer-web.herokuapp.com' || window.location.protocol !== 'https:') {
        window.location.href = 'https://www.workoutsharer.com' + window.location.pathname
    }
    
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})