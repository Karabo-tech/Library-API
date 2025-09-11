import { Request, Response, NextFunction } from 'express';
import { BadRequestError, ConflictError } from '../errors/customError';
import { authors, books } from '../data';

export const validateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name, birthYear } = req.body;
  if (!name || typeof name !== 'string' || !birthYear || typeof birthYear !== 'number') {
    throw new BadRequestError('Name (string) and birthYear (number) are required');
  }
  next();
};

export const validateBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, authorId, publicationYear } = req.body;
  if (!title || typeof title !== 'string' || !authorId || typeof authorId !== 'string' || !publicationYear || typeof publicationYear !== 'number') {
    throw new BadRequestError('Title (string), authorId (string), and publicationYear (number) are required');
  }
  const author = authors.find(a => a.id === authorId);
  if (!author) throw new BadRequestError('Invalid authorId');
  const book = books.find(b => b.title === title && b.authorId === authorId);
  if (book && req.method === 'POST') throw new ConflictError('Book already exists');
  next();
};