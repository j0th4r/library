const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function addBookToLibrary() {
  // do stuff here
  let author = document.querySelector("#author").value;
  let title = document.querySelector("#title").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  let newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  render();
}

function render() {
  const bookList = document.querySelector("#book-list");
  bookList.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    bookEl.setAttribute("class", "book-card");
    bookEl.innerHTML = `
      <div class="card-header">
        <h3 class="title">${book.title}</h3>
        <h5 class="author">${book.author}</h5>
      </div>
      <div class="card-body">
        <p>${book.pages} pages</p>
        <button class="read-btn" onClick="toggleRead(${i})">${book.read ? "Read" : "Not Read"}</button>
      </div>
      <button class="remove-btn" onClick="removeBook(${i})">Remove</button>
    `;
    bookList.appendChild(bookEl);
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}


//Dialog open and close buttons
const dialog = document.querySelector("dialog");
document.querySelector("#new-book-btn").addEventListener("click", () => {
  console.log("clicked");
  dialog.showModal();
});

document.querySelector("#close-btn").addEventListener("click", (e) => {
  event.preventDefault();
  dialog.close();
});

//Form submit
document.querySelector("#new-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  dialog.close();
});
