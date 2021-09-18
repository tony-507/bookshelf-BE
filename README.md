# Bookshelf-BE

This is the back-end server for full stack bookshelf app.

## Tech Stacks
This backend server employs the followings:
1. express
2. knex
3. Postgres

## How to Run Locally
1. First clone the code base by running
```
git clone https://github.com/tony-507/bookshelf-BE.
```

2. Open terminal and install dependencies by running
```
npm install.
```

3. Connect to appropriate database by setting configs for knex in the script ```./db.js``` and origin for CORS in the 
script ```./server.js```.

4. Start the server by running
```
npm run dev.
```

## Routes
There are routes for front-end to use. They are divided into two types:
1. Books: ```{url_backend}/books```
2. Accounts: ```{url_backend}/accounts```
For more information, please refer to scripts in ```./controllers```.

### Books
1. ```/all```: Retrieve all books records in database.
2. ```/create```: Create a new book record.
3. ```/delete```: Delete an existing book record.
4. ```/reset```: Deleta all book records in database.
5. ```/borrow```: Change the status of the book from 'On Shelf' to '{username}'.
6. ```/return```: Change the status of the book back to 'On Shelf'.
7. ```/top5```: Retrieve top five frequent records of a category.
8. ```/filter```: Retrieve book records according to filter criteria.

### Accounts
1. ```/check```: Validate account's login.
2. ```/login```: Check if one has already login or not.
3. ```/cookie```: Create cookies for a login session.
4. ```/logout```: Delete the cookies above.
5. ```/new```: Create a new account.