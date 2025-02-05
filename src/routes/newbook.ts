import { Router } from "express"
import { db } from "../database"
import { NewBook } from "../types/types"
const router = Router();

router.get("/:isbn", async function(req, res) {
		let response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${req.params.isbn}&format=json&jscmd=data`)

		let books = await response.json()
		res.send(books)

})

export default router;
