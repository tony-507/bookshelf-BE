// Import database
const knex = require('./../db')

// Check login information to validate a session
exports.checkAuth = async (req,res) => {
  const username = req.query.username
  const password = req.query.password

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

exports.setCookie = async (req,res) => {
  res
    .status(202)
    .cookie('username',req.query.username,{
      path: '/',
      expires: new Date(new Date().getTime() + 30*1000),
      httpOnly: true
    })
    .cookie('role',req.query.role,{
      path: '/',
      expires: new Date(new Date().getTime() + 30*1000),
      httpOnly: true
    })
    .send('Cookies set')
}

exports.checkLogin = async (req,res) => {
 res.send(req.cookies)
}

exports.checkLogout = async (req,res) => {
  res
    .status(202)
    .clearCookie('username',req.query.username,{
      path: '/',
      expires: new Date(new Date().getTime() + 30*1000),
      httpOnly: true
    })
    .clearCookie('role',req.query.role,{
      path: '/',
      expires: new Date(new Date().getTime() + 30*1000),
      httpOnly: true
    })
    .send('Cookies deleted')
}

// Add new account details
exports.accountCreate = async (req,res) => {

  knex('accounts')
    .insert({
      'username': req.body.username,
      'password': req.body.password,
      'email': req.body.email,
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