import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'

// Initiating dotenv
dotenv.config()

// Middlewares
import { error } from 'src/midllewares'

// Routes
import routes from 'src/routes'

// Subscription server
import { startWSServer } from 'src/graphql/gqlServer'

// Utils
import { connectToDB } from 'src/utils/database'

// Express Application
const app = express()

// Using CORS for cross site origin issue
app.use(cors({ origin: '*' }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')

  next()
})

// Using JSON for parsing request body
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Welcome to Route
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome To DIMETRA API Server' })
})

// API Routes
app.use('/api', routes)

// WildCard Route
app.use((req, res) => {
  res.status(404).json({ message: 'NotFound' })
})

// Middleware For Handling Errors
app.use(error)

// Server
const server = http.createServer(app)

connectToDB()
  .then(async () => {
    // Start GraphQL Subscription Server
    startWSServer(server)

    server.listen(process.env.PORT || 8000, () => {
      console.log('===> Server is restarted <====')
    })
  })
  .catch((err) => {
    console.log('+++ Something went wrong when restarting server, error:', err, '+++')
  })

export default server
