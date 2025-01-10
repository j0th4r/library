

class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.eventListeners();
  }

  render() {
    const bookList = document.querySelector("#book-list");
    bookList.innerHTML = "";
    for (let i = 0; i < this.books.length; i++) {
      let book = this.books[i];
      let bookEl = document.createElement("div");
      bookEl.setAttribute("class", "book-card");
      bookEl.innerHTML = `
        <div class="card-header">
          <h3 class="title">${book.title}</h3>
          <h5 class="author">${book.author}</h5>
        </div>
        <div class="card-body">
          <p>${book.pages} pages</p>
          <button class="read-btn" onClick="library.toggleRead(${i})">${book.read ? "Read" : "Not Read"}</button>
        </div>
        <hr>
        <button class="remove-btn" onClick="library.removeBook(${i})">Remove</button>
      `;
      bookList.appendChild(bookEl);
    }
  }

  toggleRead(index) {
    this.books[index].toggleRead();
    this.render();
  }
  
  addBook(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    this.books.push(newBook);
    this.render();
  }
  
  removeBook(index) {
    this.books.splice(index, 1);
    this.render();
  }
  
  eventListeners() {
    const dialog = document.querySelector("dialog");
    document.querySelector("#new-book-btn").addEventListener("click", () => dialog.showModal());
  
    document.querySelector("#close-btn").addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
    });
  
    document.querySelector("#new-book-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.querySelector("#author").value;
      const title = document.querySelector("#title").value;
      const pages = document.querySelector("#pages").value;
      const read = document.querySelector("#read").checked;

      this.addBook(author, title, pages, read);
      dialog.close();
    });
  }
}

const library = new Library();



