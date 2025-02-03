import { Router } from "express"
import { db } from "../database"
import { NewBook } from "../types/types"
const router = Router();

router.get("/search/:isbn", async function(req, res) {
		let book = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${req.params.isbn}&format=json&jscmd=data`)
		console.log(book)
})

export default router;
