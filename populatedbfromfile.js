#! /usr/bin/env node

const Book = require("./models/book");
const Author = require("./models/author");
const Genre = require("./models/genre");
const BookInstance = require("./models/bookinstance");

const { genres, authors, books, bookinstances } = require("./data");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.DB_CONNECTION_STRING;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createAuthors();
  await createBooks();
  await createBookInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, { name }) {
  // Check if Genre with same name already exists.
  const genreExists = await Genre.findOne({ name: req.body.name })
    .collation({ locale: "en", strength: 2 })
    .exec();
  if (genreExists) {
    // Genre exists, save this instead in the genres array.
    genres[index] = genreExists;
    console.log(`Genre ${name} already exist`);
  } else {
    const genre = new Genre({ name: name });
    await genre.save();
    // New genre saved. Save to genres array.
    genres[index] = genre;
    console.log(`Added genre: ${name}`);
  }
}

async function authorCreate(
  index,
  { first_name, family_name, d_birth, d_death }
) {
  const authordetail = { first_name: first_name, family_name: family_name };
  if (d_birth != false) authordetail.date_of_birth = d_birth;
  if (d_death != false) authordetail.date_of_death = d_death;

  const author = new Author(authordetail);
  await author.save();
  authors[index] = author;
  console.log(`Added author: ${first_name} ${family_name}`);
}

async function bookCreate(index, { title, summary, isbn, author, genre }) {
  const bookdetail = {
    title: title,
    summary: summary,
    author: authors[author],
    isbn: isbn,
  };
  if (genre != false) bookdetail.genre = genre.map((index) => genres[index]);

  const book = new Book(bookdetail);
  await book.save();
  books[index] = book;
  console.log(`Added book: ${title}`);
}

async function bookInstanceCreate(index, { book, imprint, due_back, status }) {
  const bookinstancedetail = {
    book: books[book],
    imprint: imprint,
  };
  if (due_back != false) bookinstancedetail.due_back = due_back;
  if (status != false) bookinstancedetail.status = status;

  const bookinstance = new BookInstance(bookinstancedetail);
  await bookinstance.save();
  bookinstances[index] = bookinstance;
  console.log(`Added bookinstance: ${imprint}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    ...genres.map((genre, index) => genreCreate(index, genre)),
  ]);
}

async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    ...authors.map((author, index) => authorCreate(index, author)),
  ]);
}

async function createBooks() {
  console.log("Adding Books");
  await Promise.all([...books.map((book, index) => bookCreate(index, book))]);
}

async function createBookInstances() {
  console.log("Adding BookInstances");
  await Promise.all([
    ...bookinstances.map((val, index) => bookInstanceCreate(index, val)),
  ]);
}
