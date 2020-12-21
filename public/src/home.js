function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  borrowedBooks = books.filter(bookObject => bookObject.borrows[0].returned == false)
  return borrowedBooks.length;
}


function getMostCommonGenres(books) {
    // reduce down to genres and number of times seen
    let listOfGenres = [];

    books.forEach(book => {
        // if I find a genre add to the count
        const foundGenre = listOfGenres.find(item => item.name === book.genre); // book or false

        if (foundGenre) {
            foundGenre.count = ++foundGenre.count;
        } else {
            listOfGenres.push({ name: book.genre, count: 1 });
        }
    });
    // sort it based on most popular count
    listOfGenres.sort((genreA, genreB) => genreB.count - genreA.count);
    // return the top 5
    console.log(listOfGenres);
    return listOfGenres.slice(0, 5);
}


function getMostPopularBooks(books) {
  books.forEach(bookObj => bookObj.count = bookObj.borrows.length);
  books.sort((bookA, bookB) => bookB.count - bookA.count);
  books.length = 5;
  const organized = books.reduce((acc, element) => {
    let obj = {};
    obj.name = element.title;
    obj.count = element.count;
    acc.push(obj);
    return acc;
  }, [])
  console.log(JSON.stringify(organized));
  return organized;
}

function getMostPopularAuthors(books, authors) {
  let tempArray = [];
  // Give each book object a popularity count
  books.forEach(bookObj => bookObj.count = bookObj.borrows.length);
  // Sort by ascending authorId number
  books.sort((bookA, bookB) => bookA.authorId - bookB.authorId);
  // Accumulate total popularity count into one object
  books.sort((bookA, bookB) => { if (bookA.authorId === bookB.authorId) bookA.count += bookB.count});
  // Consolidate book objects into single author representation
  books.sort((bookA, bookB) => { if (bookA.authorId !== bookB.authorId) tempArray.push(bookB)});
  // Sort by most popular authors
  tempArray.sort((bookA, bookB) => bookB.count - bookA.count);
  // Assign author object to book object
  tempArray.forEach(bookObj => authors.find(author => {if (bookObj.authorId === author.id) bookObj.author = author}));
  // Isolate the top five authors
  tempArray.length = 5;
  // Reduce objects into proper format and return with helper function
  return reductionHelper(tempArray, authors);
  
}

// Here is my helper function
function reductionHelper (tempArray, authors) {
    returnArray = tempArray.reduce((array, bookObj) => {
    let obj = {};
    let authorName = "";
    authors.forEach(author =>  {if (author.id === bookObj.authorId) authorName = `${author.name.first} ${author.name.last}`});
    obj.name = authorName;
    obj.count = bookObj.count;
    array.push(obj);
    return array;
  }, []);
  return returnArray;
} 

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
