import { NextFunction, Request, Response, Router } from "express";
import argon2 from 'argon2';
import { db } from "../database";

const router = Router()

function loginMiddleware(request: Request, response: Response, next: NextFunction) {
		const body = request.body;
		const userName = body.name;

		if (!userName) {
				response.status(400).json({message: "Missing property in the body"});
		}
		next();
}

interface Authentication  {
		username: string,
		password: string
}

interface User {
		id: number,
		username: string,
		password: string

}

async function verifyCredentials(user: Authentication): Promise<boolean> {
		// const result = await sql`SELECT * FROM authentication where username = ${user.username};`
		db.selectFrom("authentication").select("password").where("username", "=", user.username)
		return argon2.verify(result.password, user.password)
}

router.post('/', loginMiddleware, async (req: Request, res: Response) => {
		// check for the database if the user match cases
		console.log(req.session.id)

		const verified = await verifyCredentials({username: req.body.name, password: "test"} );
		console.log(verified)
		if (verified) {
				console.log("verified !")
				req.session.user = {username: verified.username, id: verified.id.toString()};
				res.status(201).json({username: verified.username})
		} else {
				res.status(401).json({"message": "Wrong username or password"})
		}

})

export default router;
