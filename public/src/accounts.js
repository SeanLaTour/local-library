

function findAccountById(accounts, id) {
  return accounts.find(account => account.id == id ? account : null)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1 : -1)
}

function numberOfBorrows(account, books) {
  // Define accumulator
  let accumulator = 0;
  // Return array of books that have been borrowed
  borrows = books.map(book => book.borrows)
  // Find books that have been checked out and add amount to accumulator
  findMatch = borrows.filter(bookGroup => bookGroup.find(book => {if (book.id === account.id) accumulator++}));
  // return accumulator
  return accumulator;
}



function getBooksPossessedByAccount(account, books, authors) {
  let bookArray = [];
  let foundArray = [];
  // Isolate books checked out by user
  const getBookArray = Object.values(books).filter(book=> book.borrows);
  getBookArray.filter(bookGroup => bookGroup.borrows.find(book => 
    {if (book.returned === false) bookArray.push(bookGroup)}));
  bookArray.forEach(bookObject => bookObject.borrows.find(book => 
    {if (book.id == account.id && book.returned == false) foundArray.push(bookObject)}));
  // Find the author and push to book object
  getAuthor = authors.find(author => foundArray.find(book => book.authorId == author.id))
  foundArray.forEach(bookObject => {if (bookObject.authorId === getAuthor.id) bookObject.author = getAuthor})
  return foundArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
