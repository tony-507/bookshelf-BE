// Import express
const express = require('express')

// Import books-controller
const booksRoutes = require('./../controllers/books-controller.js')

// Create router
const router = express.Router()

router.get('/all', booksRoutes.booksAll)

router.post('/create', booksRoutes.booksCreate)

router.put('/delete', booksRoutes.booksDelete)

router.put('/reset', booksRoutes.booksReset)

router.post('/status/id/:id/:username?', booksRoutes.booksStatus)

router.get('/top5', booksRoutes.topFive)

router.get('/filter', booksRoutes.bookFilter)

router.get('/id/:id', booksRoutes.fetchById)

// Export router
module.exports = router