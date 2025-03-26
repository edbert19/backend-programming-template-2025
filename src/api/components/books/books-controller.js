const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(request, response, next) {
  try {
    const books = await booksService.getBooks();

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function getBookwithParam(request, response, next) {
  try {
    const offset = parseInt(request.query.offset) || 0;
    const limit = parseInt(request.query.limit) || 10;

    if (offset < 0 || limit <= 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Offset must be >= 0 and limit must be > 0'
      );
    }

    const books = await booksService.getBooks(offset, limit);

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const { title } = request.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const book = await booksService.create(title);

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  getBookwithParam,
  createBook,
};
