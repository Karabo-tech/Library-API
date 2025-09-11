import express, { Request, Response } from 'express';
import { books } from '../data';
import { Book } from '../models/book';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../errors/customError';
import { validateBook } from '../middleware/validate';

const router = express.Router();

// Create Book
router.post('/', validateBook, (req: Request, res: Response) => {
  const { title, authorId, publicationYear } = req.body;
  const book: Book = { id: uuidv4(), title, authorId, publicationYear };
  books.push(book);
  res.status(201).json(book);
});

// List All Books
router.get('/', (req: Request, res: Response) => {
  res.json(books);
});

// Get Book by ID
router.get('/:id', (req: Request, res: Response) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) throw new NotFoundError('Book not found');
  res.json(book);
});

// Update Book
router.put('/:id', validateBook, (req: Request, res: Response) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) throw new NotFoundError('Book not found');
  const { title, authorId, publicationYear } = req.body;
  book.title = title || book.title;
  book.authorId = authorId || book.authorId;
  book.publicationYear = publicationYear || book.publicationYear;
  res.json(book);
});

// Delete Book
router.delete('/:id', (req: Request, res: Response) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) throw new NotFoundError('Book not found');
  books.splice(index, 1);
  res.status(204).send();
});

router.get('/', (req: Request, res: Response) => {
  let result = [...books];

  // Filter by author
  if (req.query.authorId) {
    result = result.filter(b => b.authorId === req.query.authorId);
  }

  // Search by title
  if (req.query.title) {
    const title = req.query.title as string;
    result = result.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
  }

  // Filter by year
  if (req.query.year) {
    const year = parseInt(req.query.year as string);
    result = result.filter(b => b.publicationYear === year);
  }

  // Sort by title or year
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy as string;
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return a.publicationYear - b.publicationYear;
      return 0;
    });
  }

  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResult = result.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: result.length,
    books: paginatedResult
  });
});

export default router;