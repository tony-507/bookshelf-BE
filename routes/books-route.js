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

router.post('/borrow', booksRoutes.booksBorrow)

router.post('/return', booksRoutes.booksReturn)

router.get('/top5', booksRoutes.topFive)

router.get('/filter', booksRoutes.bookFilter)

// Export router
module.exports = router