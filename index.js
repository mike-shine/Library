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

  ;
}

const book1 = new Book('algorithms', 'Adit Bhargava', 238, false);

console.table(book1.info());