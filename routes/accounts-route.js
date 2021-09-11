// Import express
const express = require('express')

// Import books-controller
const accountsRoutes = require('./../controllers/accounts-controller.js')

// Create router
const router = express.Router()

router.get('/check',accountsRoutes.checkAuth)

router.get('/login',accountsRoutes.checkLogin)

router.get('/createCookie',accountsRoutes.setCookie)

router.get('/logout',accountsRoutes.checkLogout)

router.post('/new',accountsRoutes.accountCreate)

module.exports = router