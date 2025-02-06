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
		role: string
}

async function verifyCredentials(user: Authentication): Promise<User | null> {
		// const result = await sql`SELECT * FROM authentication where username = ${user.username};`
		try {
				const result = await db.selectFrom("authentication").innerJoin("person", "person.id", "authentication.person_id").selectAll().where("username", "=", user.username).execute();
				let res = result[0]

				console.log("verifying")
				if (await argon2.verify(res.password , user.password)) {
						console.log("verified")
						return {id: res.person_id, username: res.username, role: res.role}
				} else {
						return null
				}
				// return argon2.verify(res.password , user.password)
		} catch(err) {
				console.log(err)
				return null
				// return false
		}
}

router.post('/', loginMiddleware, async (req: Request, res: Response) => {
		// check for the database if the user match cases
		console.log(req.session.id)

		const verified = await verifyCredentials({username: req.body.name, password: "test"} );
		console.log("Verified : ", verified)
		if (verified) {
				console.log("verified !")
				req.session.user = {username: verified.username, id: verified.id.toString()};
				console.log(verified.role)
				res.cookie('role', verified.role)
				res.setHeader("Set-Cookie", `role=${verified.role}`)
				res.status(201).json({username: verified.username})
		} else {
				console.log("ERROR")
				res.status(401).json({"message": "Wrong username or password"})
		}

})

router.post("/register", async (req: Request, res: Response) => {
		if (!req.body.password) {res.status(400).json({message: "Missing password"}); return;}
		const hash = await argon2.hash(req.body.password)
		res.send({hash: hash})
})

export default router;
