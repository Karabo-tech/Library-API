# Library API

A RESTful API for managing a library system with authors and books, built with TypeScript and Express.

## Setup

1. Clone the repository:
   ```bash
   git clone github.com/Karabo-tech/Library-API
   cd library-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authors

#### Create Author
- **Endpoint:** `POST /authors`
- **Body:** `{ "name": string, "birthYear": number }`
- **Response:** `201` - author object

#### List Authors
- **Endpoint:** `GET /authors`
- **Response:** `200` - array of authors

#### Get Author
- **Endpoint:** `GET /authors/:id`
- **Response:** `200` - author object; `404` if not found

#### Update Author
- **Endpoint:** `PUT /authors/:id`
- **Body:** `{ "name": string, "birthYear": number }`
- **Response:** `200` - updated author

#### Delete Author
- **Endpoint:** `DELETE /authors/:id`
- **Response:** `204` - no content

#### List Books by Author
- **Endpoint:** `GET /authors/:id/books`
- **Response:** `200` - array of books; `404` if author not found

### Books

#### Create Book
- **Endpoint:** `POST /books`
- **Body:** `{ "title": string, "authorId": string, "publicationYear": number }`
- **Response:** `201` - book object; `400` if invalid; `409` if duplicate

#### List Books
- **Endpoint:** `GET /books`
- **Query Parameters:**
  - `authorId`: Filter by author
  - `title`: Search by title
  - `year`: Filter by publication year
  - `sortBy`: Sort by title or year
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Response:** `200` - paginated books

#### Get Book
- **Endpoint:** `GET /books/:id`
- **Response:** `200` - book object; `404` if not found

#### Update Book
- **Endpoint:** `PUT /books/:id`
- **Body:** `{ "title": string, "authorId": string, "publicationYear": number }`
- **Response:** `200` - updated book

#### Delete Book
- **Endpoint:** `DELETE /books/:id`
- **Response:** `204` - no content

## Error Handling

- **400:** Bad Request (invalid input)
- **404:** Not Found (resource not found)
- **409:** Conflict (duplicate book)
- **500:** Internal Server Error

## Testing

Use Postman to test endpoints. Ensure valid JSON payloads and correct author IDs for books.

## Notes

- Data is stored in-memory and resets on server restart.
- Validation ensures required fields and valid author IDs.

## Final Notes

- The API uses an in-memory array for simplicity, as no database is specified.
- The validation middleware ensures books reference valid authors and prevents duplicate books (same title and author).
- Query parameters support filtering, searching, sorting, and pagination as requested.
- Error handling is centralized with appropriate status codes.
- The README provides clear documentation for all endpoints and testing instructions.

## Running the Project

To run the project:

```bash
npm run dev
```
