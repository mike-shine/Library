/* Structural components */

const body = document.querySelector('body');

const newBookButton = document.querySelector('.newBookButton');

const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

const libraryCardDisplay = document.createElement('div');
libraryCardDisplay.classList.add('libraryCardDisplay');
body.appendChild(libraryCardDisplay);




/* Modal components */

newBookButton.addEventListener('click', function() {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
  console.log('modal button clicked');
});


/*  Library functionality */

let myLibrary = [];


function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
  this.info = function() {
    return Boolean(read)
    ? `${title} by ${author}, ${pageCount} pages, has been read.`
    : `${title} by ${author}, ${pageCount} pages, not read yet.`;
  }
}

function addToLibrary(book) {
  let newEntry = {
    title: book.title,
    author: book.author,
    pageCount: book.pageCount,
    read: book.read
  }
  myLibrary.push(newEntry);
  displayLibrary();
}

const indexesOnDOM = [];

function displayLibrary() {
  myLibrary.forEach((book, index) => {
    if (indexesOnDOM.indexOf(index) !== -1) {
      return;
    } else {
      let libraryCard = document.createElement('div');
      libraryCard.classList.add('libraryCard');

      let libraryCardTitle = document.createElement('div');
      libraryCardTitle.textContent = `Title: ${book.title}`;
      libraryCardTitle.classList.add('title');


      let libraryCardAuthor = document.createElement('div');
      libraryCardAuthor.textContent = `Author: ${book.author}`;
      libraryCardAuthor.classList.add('author');


      let libraryCardPageCount = document.createElement('div');
      libraryCardPageCount.textContent = `Page count: ${book.pageCount}`;
      libraryCardPageCount.classList.add('pageCount');


      let libraryCardReadStatus = document.createElement('div');
      let answer = null;
      if (book.read) {
        answer = 'Yes';
      } else {
        answer = 'No';
      }
      libraryCardReadStatus.textContent = `Have you read this book? ${answer}`;


      libraryCard.appendChild(libraryCardTitle);
      libraryCard.appendChild(libraryCardAuthor);
      libraryCard.appendChild(libraryCardPageCount);
      libraryCard.appendChild(libraryCardReadStatus);
      indexesOnDOM.push(index);
      libraryCardDisplay.appendChild(libraryCard);
    }

  })

}

const book1 = new Book('algorithms', 'Adit Bhargava', 238, false);
const book2 = new Book('What Color Is Your Parachute?', 'Richard Bolles', 309, false);
const book3 = new Book('Kane and Abel', 'Jeffrey Archer', 512, true);

addToLibrary(book1);
addToLibrary(book2);
addToLibrary(book3);


console.table(myLibrary);