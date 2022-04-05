"use strict";

const BOOKS_DB = "booksDB";
const PAGE_SIZE = 2;

var gBooks = [];
var sortBy = "";
var gPageIdx = 0;

function sortBooks(sortBy) {
  gBooks.sort(function (book1, book2) {
    return book2[sortBy] < book1[sortBy] ? 1 : -1;
  }, sortBy);
  _saveBooks();
}

function updateBookRate(bookId, action) {
  const book = gBooks[getBookIdx(bookId)];
  book.rate = action === "+" ? (book.rate + 1) % 11 : (book.rate - 1) % 11;
}

function getBookRate(bookId) {
  return gBooks[getBookIdx(bookId)].rate;
}

function getBookName(bookId) {
  const bookIdx = getBookIdx(bookId);
  return gBooks[bookIdx].title;
}

function getBookDesc(bookId) {
  const bookIdx = getBookIdx(bookId);
  return gBooks[bookIdx].review;
}

function UpdateBook(bookId, newPrice) {
  const bookIdx = getBookIdx(bookId);
  gBooks[bookIdx].price = newPrice;
  _saveBooks();
}

function AddBook(bookName, bookPrice) {
  gBooks.push(_createBook(bookName, bookPrice));
  _saveBooks();
}

function removeBook(bookId) {
  gBooks.splice(getBookIdx(bookId), 1);
  _saveBooks();
}

function getBookIdx(bookId) {
  return gBooks.findIndex((book) => book.id === bookId);
}

function getBooksForDisplay() {
  const idxStart = gPageIdx * PAGE_SIZE;
  const books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
  return books;
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
}

function createBooks() {
  const books = _loadBooks();
  if (books) {
    gBooks = books;
  } else {
    gBooks.push(_createBook("Harry Potter", 80));
    gBooks.push(_createBook("THe Da Vinvi Code", 200));
    gBooks.push(_createBook("Ali Baba", 100));
    gBooks.push(_createBook("Peter Pan", 90));
  }

  _saveBooks();
}
function _saveBooks() {
  saveToStorage(BOOKS_DB, gBooks);
}

function _loadBooks() {
  return loadFromStorage(BOOKS_DB);
}

function _createBook(title, price) {
  return {
    id: makeId(),
    title,
    price,
    review: makeLorem(),
    rate: 0,
  };
}
