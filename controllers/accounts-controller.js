// Import database
const knex = require('./../db')

// Check login information to validate a session
exports.checkAuth = async (req,res) => {
  const username = req.params.username
  const password = req.params.password

  if (password) {
    knex
      .select('role')
      .from('accounts')
      .where('username',username)
      .andWhere('password',password)
      .then(userData => {
      	  res.json(userData)
      })
      .catch(err => {
      	res.json(`${err}: \n Error in retrieving account details.`)
      })
  }
  else {
    knex
      .select('role')
      .from('accounts')
      .where('username',username)
      .then(userData => {
          res.json(userData)
      })
      .catch(err => {
        res.json(`${err}: \n Error in retrieving account details.`)
      })
  }
}

// Set cookies needed
exports.setCookie = async (req,res) => {
  res
    .status(202)
    .cookie('username',req.params.username,{
      path: '/',
      expires: new Date(new Date().getTime() + 300*1000),
      httpOnly: true
    })
    .cookie('role',req.params.role,{
      path: '/',
      expires: new Date(new Date().getTime() + 300*1000),
      httpOnly: true
    })
    .send('Cookies set')
}

// Send cookie data as JSON
exports.checkLogin = async (req,res) => {
 res.send(req.cookies)
}

// Clear all cookies
exports.checkLogout = async (req,res) => {
  res
    .status(202)
    .clearCookie('username',req.params.username,{
      path: '/',
      expires: new Date(new Date().getTime() + 300*1000),
      httpOnly: true
    })
    .clearCookie('role',req.params.role,{
      path: '/',
      expires: new Date(new Date().getTime() + 300*1000),
      httpOnly: true
    })
    .send('Cookies deleted')
}

// Add new account details
exports.accountCreate = async (req,res) => {

  knex('accounts')
    .insert({
      'username': req.params.username,
      'password': req.params.password,
      'email': req.params.email,
      'role': 'user'
    })
    .then(() => {
      // Display success message
      res.json({message: `Account created.`})
    })
    .catch(err => {
      res.json({message: `${err}`})
    })
}