import { NextFunction, Request, Response, Router } from "express";
import sql from "../db"
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

async function verifyCredentials(user: Authentication): Promise<User | null> {
		const result = await sql`SELECT * FROM authentication where username = ${user.username};`
		if (result.length == 1) {
				const first = result.shift();
				if (first && first.password == user.password) {
						console.log("returning", first)
						return {username: first.username, id: first.person_id, password: first.password}
				} else {
						return null
				}
		}
		return null
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
