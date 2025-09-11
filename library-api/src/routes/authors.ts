import express, { Request, Response } from 'express';
import { authors } from '../data';
import { Author } from '../models/author';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../errors/customError';
import { validateAuthor } from '../middleware/validate';

const router = express.Router();

// Create Author
router.post('/', validateAuthor,  (req: Request, res: Response) => {
  const { name, birthYear } = req.body;
  const author: Author = { id: uuidv4(), name, birthYear };
  authors.push(author);
  res.status(201).json(author);
});

// List All Authors
router.get('/', (req: Request, res: Response) => {
  res.json(authors);
});

// Get Author by ID
router.get('/:id', (req: Request, res: Response) => {
  const author = authors.find(a => a.id === req.params.id);
  if (!author) throw new NotFoundError('Author not found');
  res.json(author);
});

// Update Author
router.put('/:id', validateAuthor,  (req: Request, res: Response) => {
  const author = authors.find(a => a.id === req.params.id);
  if (!author) throw new NotFoundError('Author not found');
  const { name, birthYear } = req.body;
  author.name = name || author.name;
  author.birthYear = birthYear || author.birthYear;
  res.json(author);
});

// Delete Author
router.delete('/:id', (req: Request, res: Response) => {
  const index = authors.findIndex(a => a.id === req.params.id);
  if (index === -1) throw new NotFoundError('Author not found');
  authors.splice(index, 1);
  res.status(204).send();
});

export default router;