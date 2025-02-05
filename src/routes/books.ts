// Will handle response to get all books
import { Router } from "express";
import { db } from "../database";
const router = Router();

// Define a GET route to fetch book information
router.get('/', async function(_req, res) {
    const response = await db.selectFrom('books').leftJoin("site", "site.id", "site_id").selectAll().execute()

    res.send(response)
});

router.get('/:ISBN', async function(req, res) {
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
    db.insertInto('books').values({
        isbn: body.isbn,
        title: body.title,
        author: body.author,
        description: body.description,
        cover: body.cover,
        site_id: body.site_id
    }).execute()

    res.send({messsage: "Book Added"})
})

export default router;
