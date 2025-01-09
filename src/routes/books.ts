// Will handle response to get all books
import { Router } from "express";
const router = Router();

// Sample data to simulate a database
const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    site: "Amazon",
    description: "A novel about the serious issues of rape and racial inequality.",
    coverImage: "https://example.com/tokillamockingbird.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    site: "Barnes & Noble",
    description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
    coverImage: "https://example.com/1984.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    site: "Book Depository",
    description: "A story about the American dream and the roaring twenties.",
    coverImage: "https://example.com/thegreatgatsby.jpg",
  }
];

// Define a GET route to fetch book information
router.get('/', (_req, res) => {
  res.json({books: books});
});

export default router;
