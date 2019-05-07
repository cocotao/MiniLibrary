const Books = require('../db/models/books');

// const BooksSchema = new Schema({
//     title: { type: String, default: 1024}, 
//     description: { type: String, default: 1024 }, 
//     count: { type: Number, default: 0, min: 0, max: 1024 }, 
//   });

module.exports.createNewBook = function (title, description, count) {
  const book = new Books({
    title: title,
    description: description,
    count: count
  });
  return book.save();
};


module.exports.updateBookById = function(id, bookItem) {
  const updateStr = bookItem;
  return Books.findByIdAndUpdate({ '_id': id }, updateStr);
};

module.exports.searchBookById = function(id) {
  return Books.findOne({ '_id': id }, '_id title description count');
};

module.exports.searchBookByTitle = function(title) {
  return Books.findOne({ 'title': title }, '_id title description count');
};

module.exports.getAllBooks = function() {
    return Books.find({}, '_id title description count');
  };

module.exports.DeleteBookById = function(id) {
  return Books.remove({ '_id': id });
};
