function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  findFalse = books.filter(book => book.borrows[0].returned == false);
  findTrue = books.filter(book => book.borrows[0].returned == true);
  const returnArray = [[...findFalse], [...findTrue]]
  return returnArray;
}

function getBorrowersForBook(book, accounts) {
  const findAccounts = accounts.filter(account => book.borrows.find(checked => checked.id === account.id));
  findAccounts.forEach(account => book.borrows.find(book => account.returned = book.returned));
  return findAccounts;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
