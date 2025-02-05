// Post to get a new borrow
// delete to remove one 
// get to get all borrow by a person

import { Router } from "express";
import { db } from "../database";
const router = Router();

// Define a GET route to fetch book information
router.get('/:userId', async function(req, res) {
    if (!Number(req.params.userId)) {
        console.log("Invalid user id")
        res.status(400).send({message: "Invalid user id"})
        return
    }
    const response = await db.selectFrom('person').leftJoin("books", "books.borrower_id", "person.id").where('person.id','=', req.params.userId).selectAll().executeTakeFirst()

    res.send(response)
})

router.post('/add', async function(req, res) {
    // verify json content
    const body = req.body

    if (!body.isbn || !body.userId) {
        res.status(400).send({message: "Missing required fields"})
        return
    }

    // save to database
    db.updateTable('books').set({ borrower_id: body.userId }).where('isbn', '=', body.isbn).execute()
        .then(x => res.send({message: "Book Borrowed"}))
        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Error borrowing book"})
        }
    )
})

router.post('/return', async function(req, res) {
    // verify json content
    const body = req.body
    if (!body.isbn || !body.userId) {
        res.status(400).send({message: "Missing required fields"})
        return
    }
    
    // check if the book is borrowed by the user
    const borrowerId = await db.selectFrom('books').where('isbn', '=', body.isbn).select("borrower_id").executeTakeFirst()
    if (borrowerId != body.userId) res.status(401).send({message: "User did not borrowed the book"})


    // save to database
    db.updateTable('books').set({ borrower_id: null }).where('isbn', '=', body.isbn).execute()
        .then(x => res.send({messae: "Book Borrowed"}))
        .catch(x => {
            res.status(500).send({message: "Error borrowing book"})
        }
    )
})


export default router;
