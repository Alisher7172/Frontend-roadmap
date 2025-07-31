// Object Editor Functionality
document
  .querySelector("#objectEditor + .run-btn")
  .addEventListener("click", function () {
    const editor = document.getElementById("objectEditor");
    const output = document.getElementById("objectOutput");

    // Clear previous output
    output.innerHTML = "Output:<br>";

    try {
      // Capture console.log output
      const originalLog = console.log;
      let logs = [];

      console.log = function () {
        logs.push(Array.from(arguments).join(" "));
        originalLog.apply(console, arguments);
      };

      // Execute the code
      eval(editor.textContent);

      // Restore console.log
      console.log = originalLog;

      // Display the output
      if (logs.length > 0) {
        output.innerHTML += logs.join("<br>");
      } else {
        output.innerHTML += "No output. Use console.log() to display values.";
      }
    } catch (error) {
      output.innerHTML += `Error: ${error.message}`;
    }
  });

// Challenge button functionality
document.getElementById("challengeBtn").addEventListener("click", function () {
  const solution = document.getElementById("solution");
  solution.classList.add("show");

  // Execute the solution code
  class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.available = true;
    }

    borrow() {
      if (this.available) {
        this.available = false;
        return true;
      }
      return false;
    }

    returnBook() {
      this.available = true;
    }
  }

  class Library {
    constructor() {
      this.books = [];
    }

    addBook(book) {
      this.books.push(book);
    }

    findBook(isbn) {
      return this.books.find((book) => book.isbn === isbn);
    }

    listBooks() {
      return this.books;
    }
  }

  class User {
    constructor(name) {
      this.name = name;
      this.borrowedBooks = [];
    }

    borrowBook(library, isbn) {
      const book = library.findBook(isbn);
      if (book && book.borrow()) {
        this.borrowedBooks.push(book);
        return true;
      }
      return false;
    }

    returnBook(isbn) {
      const index = this.borrowedBooks.findIndex((book) => book.isbn === isbn);
      if (index !== -1) {
        const book = this.borrowedBooks[index];
        book.returnBook();
        this.borrowedBooks.splice(index, 1);
        return true;
      }
      return false;
    }
  }

  // Test the system
  const library = new Library();
  const book1 = new Book("Clean Code", "Robert Martin", "12345");
  library.addBook(book1);

  const user = new User("Alice");
  user.borrowBook(library, "12345");

  console.log(
    "User borrowed books:",
    user.borrowedBooks.map((b) => b.title)
  );
  console.log("Book availability:", book1.available);
});

// Toggle solution
document
  .getElementById("toggleSolution")
  .addEventListener("click", function () {
    const solution = document.getElementById("solution");
    solution.classList.toggle("show");
    this.textContent = solution.classList.contains("show")
      ? "Hide Solution"
      : "Show Solution";
  });

// Add animation to properties
const properties = document.querySelectorAll(".property");
properties.forEach((property, index) => {
  property.style.animationDelay = `${index * 0.1}s`;
  property.classList.add("animate__animated", "animate__fadeInLeft");
});
