// Import database
const knex = require('./../db')

// Retrieve all books
exports.booksAll = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('books') // from 'books' table
    .orderBy('id')
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

// Create new book
exports.booksCreate = async (req, res) => {
  // Add new book to database
  knex('books')
    .insert({ // insert new record, a book
      'author': req.body.author,
      'title': req.body.title,
      'rating': req.body.rating,
      'status': 'On Shelf',
      'genre': req.body.genre,
      'desc': req.body.desc
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Book \'${req.body.title}\' by ${req.body.author} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.title} book: ${err}` })
    })
}

// Remove specific book
exports.booksDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('books')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Book ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
    })
}

// Remove all books on the list
exports.booksReset = async (req, res) => {
  // Remove all books from database
  knex
    .select('*') // select all records
    .from('books') // from 'books' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Book list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting book list: ${err}.` })
    })
}

// Update book status, borrow or return
exports.booksStatus = async (req, res) => {
  let username = req.params.username
  if (username) {
    knex('books')
      .where('id', req.params.id)
      .update('status', req.params.username)
      .then(() => {
        res.json({ message: `Borrow book with id ${req.params.id} successfully` })
      })
      .catch(err => {
        res.json({ message: `Error in borrowing book with id ${req.params.id}: ${err}.`})
      })
  }
  else {
    knex('books')
      .where('id', req.params.id)
      .update('status', 'On Shelf')
      .then(() => {
        res.json({ message: `Return book with id ${req.params.id} successfully` })
      })
      .catch(err => {
        res.json({ message: `Error in returning book with id ${req.params.id}: ${err}.`})
      })
  }
}

// Fetch first five items of a type
exports.topFive = async (req, res) => {
  knex('books')
    .distinct(req.query.type)
    .limit(5)
    .orderBy(req.query.type)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

exports.bookFilter = async (req, res) => {
  const query = knex('books').where('rating', 'in', req.query.selectedRating).andWhere('genre', 'in', req.query.selectedGenre)

  if (req.query.notOnShelf==='true' && req.query.selectedStatus.length < 3) {
    query.where('status', 'not in', req.query.selectedStatus)
  }
  else if (req.query.notOnShelf==='true') {

  }
  else {
    query.where('status', 'in', req.query.selectedStatus)
  }

  query
    .orderBy('id')
    .then(data => res.json(data))
    .catch(err => res.json({message: `Error in filtering books: ${err}`}))
}

exports.fetchById = async (req, res) => {
  knex('books')
    .select('*')
    .where('id', req.params.id)
    .orderBy('id')
    .then(data => res.json(data))
    .catch(err => res.json({message: `${err}`}))
}