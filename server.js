// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

// Import routes
const booksRouter = require('./routes/books-route')
const accountsRouter = require('./routes/accounts-route')

// Set default port for express app
const PORT = process.env.PORT || 5000

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes

// CORS config for prod
app.use(cors({
  credentials: true,
  origin: 'https://bkmangement.herokuapp.com'
}))

// CORS config for dev
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:3000'
// }))

app.use(helmet())
app.use(compression())

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// Implement books route
app.use('/books', booksRouter)

// Implement account route
app.use('/accounts', accountsRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(process.env.PORT || PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})