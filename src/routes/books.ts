// Will handle response to get all books
import { Router } from "express";
import { db } from "../database";
import { BookUpdate, Book, NewBook } from "../types/types";
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
router.get('/', async function(_req, res) {
    const response = await db.selectFrom('books').leftJoin("site", "site.id", "site_id").selectAll().execute()

    res.send(response)
});

router.get('/getOne/:ISBN', async function(req, res) {
    const response = await db.selectFrom('books').leftJoin("site", "site.id", "site_id").where('isbn','=', req.params.ISBN).selectAll().executeTakeFirst()

    res.send(response)
})

router.post('/add', async function(req, res) {
    // verify json content
    const body = req.body

    if (!body.isbn || !body.title || !body.author || !body.description || !body.cover || !body.site_id) {
        res.status(400).send({message: "Missing required fields"})
        return
    }

    body.site_id = parseInt(body.site_id)

    // save to database
    // db.insertInto('books').values(books as NewBook).execute()
    res.send({requestBody: req.body})
})

export default router;
