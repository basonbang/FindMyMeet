import express from 'express'
import './config/dotenv.js'
import path from 'path'
import favicon from 'serve-favicon'
import cors from 'cors'

// import the router from your routes file
import meetsRouter from './routes/meets.js'
import statesRouter from './routes/states.js'
import customMeetsRouter from './routes/customMeets.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/api/meets', meetsRouter)
app.use('/api/states', statesRouter)
app.use('/api/custom-meets', customMeetsRouter)

// serve main entry point for application
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">FindMyMeet API</h1>')
})

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server listening on http://localhost:${PORT}`)
})