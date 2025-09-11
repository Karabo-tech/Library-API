import express from 'express';
import { logger } from './middleware/logger';
import authorRoutes from './routes/authors';
import { errorHandler } from './errors/customError';

const app = express();
app.use(express.json());
app.use(logger);

app.use('/authors', authorRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});