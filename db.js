// Create connection to Postgres database
const knex = require('knex')({
  client: 'pg',
  connection: {
    "host": "ec2-44-195-201-3.compute-1.amazonaws.com",
    "user": "lywfuanknbnvat",
    "password": "3d97d208fcdfa7babbb0369d9f42b8bb996b661c293ed65be02db1c89e4c8d38",
    "database": "d4i1256j49i9bc",
    ssl: { rejectUnauthorized: false }
  },
  useNullAsDefault: true
})

// Create a table in the database called "books"
knex.schema
  // Make sure no "books" table exists
  // before trying to create new
  .hasTable('books')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
        return knex.schema.createTable('books', (table)  => {
          table.increments('id').primary()
          table.string('author')
          table.string('title')
          table.integer('rating')
          table.string('status')
          table.string('genre')
          table.string('desc')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Books\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('Books done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Table for storing accounts
knex.schema
  .hasTable('accounts')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
        return knex.schema.createTable('accounts', (table)  => {
          table.increments('id').primary()
          table.string('username')
          table.string('password')
          table.string('email')
          table.string('role')
        })
          .then(() => {
            return knex('accounts')
              .insert({
                'username': 'admin001',
                'password': 'password',
                'email': 'admin001@gmail.com',
                'role': 'admin'
              })
              .then(() => {
                // Display success message
                console.log(`Admin account created.`)
              })
              .catch(err => {
                console.error(`Error in creating admin account: ${err}`)
              })
          })
          .then(() => {
            // Log success message
            console.log('Table \'accounts\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating table: ${error}`)
          })
      }
    })
    .then(() => {
      // Log success message
      console.log('Accounts done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "books" table
// knex.select('*').from('books')
//   .then(data => console.log('data:', data))
//   .catch(err => console.log(err))

// Export the database
module.exports = knex