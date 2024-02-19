// genre, author, book, bookinstances
// if a field is unavailable provide false

// schemas

// const GenreSchema = new Schema({
//   name: { type: String, required: true, minLength: 3, maxLength: 100 },
// });

// const AuthorSchema = new Schema({
//   first_name: { type: String, required: true, maxLength: 100 },
//   family_name: { type: String, required: true, maxLength: 100 },
//   date_of_birth: { type: Date },
//   date_of_death: { type: Date },
// });

// const BookSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: mongoose.Types.ObjectId, ref: "Author", required: true }, // reference to the associated author
//   summary: { type: String, required: true },
//   isbn: { type: String, required: true },
//   genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
// });

// const BookInstanceSchema = new Schema({
//   book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
//   imprint: { type: String, required: true },
//   status: {
//     type: String,
//     required: true,
//     enum: ["Available", "Maintenance", "Loaned", "Reserved"],
//     default: "Maintenance",
//   },
//   due_back: { type: Date, default: Date.now },
// });

// reference other objects by their index or array of indexes
const genres = [{ name: "genre-a" }, { name: "genre-b" }, { name: "genre-c" }];
const authors = [
  {
    first_name: "Fake",
    family_name: "Author",
    date_of_birth: false,
    date_of_death: false,
  },
];
const books = [
  {
    title: "Book-1",
    summary: "summary 1",
    author: 0,
    isbn: "1",
    genre: [0, 1, 2],
  },
  { title: "Book-2", summary: "summary 2", author: 0, isbn: "2", genre: false },
];
const bookinstances = [
  { book: 1, imprint: "XYZ", due_back: false, status: "Maintenance" },
];

module.exports = { genres, authors, books, bookinstances };
