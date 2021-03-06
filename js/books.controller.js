"use strict";

function Init() {
  renderBooks();
}

function renderBooks() {
  const books = getBooksForDisplay();
  var strHTML;
  strHTML = books.map(function (book) {
    return `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td><button class="btn-review" onclick="onReview('${book.id}')">Review</button></td>
        <td><button class="btn-update" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="btn-delete" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>`;
  });

  const elTableBody = document.querySelector("tbody");
  elTableBody.innerHTML = strHTML.join("");
}

function onAddRate(bookId) {
    updateBookRate(bookId,'+');
    onReview(bookId);
}

function onSubRate(bookId) {
    updateBookRate(bookId,'-');
    onReview(bookId);
}

function onReview(bookId) {
  const bookDesc = getBookDesc(bookId);
  const bookName = `<h2>${getBookName(bookId)}</h2>`;
  const elModal = document.querySelector(".modal-container");
  elModal.innerHTML =
    bookName +
    bookDesc +
    `<button class="btn-ext-modal" onclick="onCloseModal()">X</button>
    <div class="rate">
      <button class="add-rate" onclick="onAddRate('${bookId}','+')">+</button>
      <a class="book-rate">${getBookRate(bookId)}</a>
      <button class="sub-rate" onclick="onSubRate('${bookId}','-')">-</button>
    </div>`;
  elModal.classList.add("show");
}

function onCloseModal(){
    const elModal = document.querySelector(".modal-container");
    elModal.classList.remove("show");
}

function onUpdateBook(bookId) {
  const newPrice = +prompt("Please enter the new price");
  UpdateBook(bookId, newPrice);
  renderBooks();
}

function onDeleteBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function onAddBook() {
  const bookName = prompt("Please enter the books title");
  const bookPrice = prompt("please enter the books price");
  AddBook(bookName, bookPrice);
  renderBooks();
}
