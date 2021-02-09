/* Structural & modal components */

const body = document.querySelector('body');

const newBookButton = document.getElementsByClassName('newBookButton')[0];
newBookButton.addEventListener('click', function() {
  modal.style.display = 'block';
});

const modal = document.getElementById('myModal');

const span = document.getElementsByClassName('close')[0];
span.addEventListener('click', function() {
  modal.style.display = 'none';
});

window.addEventListener('click', function() {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
})

const libraryCardDisplay = document.createElement('div');
libraryCardDisplay.classList.add('libraryCardDisplay');
body.appendChild(libraryCardDisplay);

let newBookInfo = document.getElementById('newBookFromForm');
newBookInfo.addEventListener('click', function() {
  modal.style.display = 'none';
  addToLibrary(addBookFromInput());
});

const clearLibraryButton = document.createElement('button');
clearLibraryButton.textContent = 'Clear library';
clearLibraryButton.addEventListener('click', function() {
  let allBooks = document.querySelector('.libraryCardDisplay');
  allBooks.innerHTML = '';
})
body.appendChild(clearLibraryButton);






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
    read: book.read,
  }
  myLibrary.push(newEntry);
  displayLibrary(myLibrary);
}

// function removeFromLibrary(bookTitle) {
//   myLibrary = myLibrary.filter(book => book.title !== bookTitle);
//   displayLibrary(myLibrary);
// }

let indexesOnDOM = [];

function displayLibrary(array) {
  array.forEach((book, index) => {
    if (indexesOnDOM.indexOf(index) !== -1) {
      return;
    } else {
      let libraryCard = document.createElement('div');
      libraryCard.classList.add('libraryCard');
      libraryCard.setAttribute('id', `${index}`)

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
      let readUnreadButton = document.createElement('button');
      let answer = null;
      if (book.read) {
        answer = 'I have read this book!';
        readUnreadButton.textContent = 'Actually, I haven\'t read this book';
        libraryCard.classList.add('readBook');
        libraryCard.classList.remove('unreadBook');
      } else {
        answer = 'I haven\'t gotten around to reading this book yet...';
        readUnreadButton.textContent = 'I just finished reading this book!';
        libraryCard.classList.add('unreadBook');
        libraryCard.classList.remove('readBook');
      }
      libraryCardReadStatus.textContent = `${answer}`;

      let libraryCardIndex = book.index;

      let removeBookButton = document.createElement('button');
      removeBookButton.textContent = 'Remove this book';
      removeBookButton.addEventListener('click', function(e) {
        console.log(e);

        // removeFromLibrary(e.target.parentNode.firstChild.innerHTML);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      })

      readUnreadButton.addEventListener('click', function() {
        if (book.read) {
          answer = 'I haven\'t gotten around to reading this book yet...';
          book.read = false;
          readUnreadButton.textContent = 'I just finished reading this book!';
          libraryCard.classList.remove('readBook');
          libraryCard.classList.add('unreadBook');
        } else {
          answer = 'I have read this book!';
          book.read = true;
          readUnreadButton.textContent = 'Actually, I haven\'t read this book';
          libraryCard.classList.remove('unreadBook');
          libraryCard.classList.add('readBook');
        }
        libraryCardReadStatus.textContent = `${answer}`;
      });



      // button text that changes along with toggle??
      // background color of library card turns red/green, depending on read status


      libraryCard.appendChild(libraryCardTitle);
      libraryCard.appendChild(libraryCardAuthor);
      libraryCard.appendChild(libraryCardPageCount);
      libraryCard.appendChild(libraryCardReadStatus);
      libraryCard.appendChild(removeBookButton);
      libraryCard.appendChild(readUnreadButton);
      indexesOnDOM.push(index);
      libraryCardDisplay.appendChild(libraryCard);
    }

  })

}

function addBookFromInput() {
  const title = document.querySelector('#titleField').value;
  const author = document.querySelector('#authorField').value;
  const pageCount = document.querySelector('#pageCountField').value;
  const readStatus = document.querySelector('#readStatus').checked;
  return new Book(title, author, pageCount, readStatus);
}

const book1 = new Book('algorithms', 'Adit Bhargava', 238, false);
const book2 = new Book('What Color Is Your Parachute?', 'Richard Bolles', 309, false);
const book3 = new Book('Kane and Abel', 'Jeffrey Archer', 512, true);

addToLibrary(book1);
addToLibrary(book2);
addToLibrary(book3);



