"use strict";

function init() {
  createBooks();
  renderBooks();
  doTrans();
}

function onNextPage(){
  nextPage();
  renderBooks();
  doTrans();
}

function renderBooks() {
  const books = getBooksForDisplay();
  var strHTML;
  strHTML = books.map(function (book) {
    return `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td class="currency">${book.price}</td>
        <td><button type="button" class="btn btn-outline-info" data-trans="review" data-bs-toggle="modal" data-bs-target="#reviewModal" onclick="onReview('${book.id}')"></button></td>
        <td><button type="button" class="btn btn-outline-primary" data-trans="update" onclick="onUpdateBook('${book.id}')"></button></td>
        <td><button type="button" class="btn btn-outline-danger" data-trans="delete" onclick="onDeleteBook('${book.id}')"></button></td>
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
  const bookName = `<h2 class="modal-title" id="reviewModalLabel">${getBookName(bookId)}</h2>`;
  const elModalCon=document.querySelector('.modal-content')
  elModalCon.querySelector('.modal-header').innerHTML=bookName+'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
  elModalCon.querySelector('.modal-body').innerText=bookDesc;
  elModalCon.querySelector('.modal-footer').innerHTML=`<button type="button" class="btn btn-secondary" onclick="onAddRate('${bookId}','+')">+</button>
  <text class="book-rate">${getBookRate(bookId)}</text>
  <button type="button" class="btn btn-primary" onclick="onSubRate('${bookId}','-')">-</button>`

//   const elModal = document.querySelector(".modal-container");
//   elModal.innerHTML =
//     bookName +
//     bookDesc +
//     `<button type="button" class="btn-ext-modal" onclick="onCloseModal()">X</button>
//     <div class="rate">
      // <button class="add-rate" onclick="onAddRate('${bookId}','+')">+</button>
      // <text class="book-rate">${getBookRate(bookId)}</text>
      // <button class="sub-rate" onclick="onSubRate('${bookId}','-')">-</button>
//     </div>`;
//   elModal.classList.add("show");
// }
}

function onCloseModal(){
    const elModal = document.querySelector(".modal-container");
    elModal.classList.remove("show");
}

function onUpdateBook(bookId) {
  const newPrice = +prompt("Please enter the new price");
  UpdateBook(bookId, newPrice);
  renderBooks();
  doTrans();
}

function onDeleteBook(bookId) {
  removeBook(bookId);
  renderBooks();
  doTrans();
}

function onAddBook() {
  const elInput=document.querySelectorAll('input');
  const bookName=elInput[0].value;
  const bookPrice=elInput[1].value;
  
  elInput.forEach((el)=>el.value='');

  AddBook(bookName, bookPrice);
  renderBooks();
  doTrans();
}

function onSort(sortBy){
  sortBooks(sortBy);
  renderBooks();
  doTrans();
}

function onChangeLang(elSelect){
  setLang(elSelect.value);
  renderBooks();
  doTrans();
}

function onChangeCurr(elSelect){
  setCurr(elSelect.value);
  renderBooks();
  doTrans();
}