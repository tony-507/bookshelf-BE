// Import express
const express = require('express')

// Import books-controller
const accountsRoutes = require('./../controllers/accounts-controller.js')

// Create router
const router = express.Router()

router.get('/existence/:username/:password?',accountsRoutes.checkAuth)

router.get('/login',accountsRoutes.checkLogin)

router.get('/cookie/:role/:username',accountsRoutes.setCookie)

router.get('/logout/:role/:username',accountsRoutes.checkLogout)

router.post('/new/:username/:password/:email',accountsRoutes.accountCreate)

module.exports = router