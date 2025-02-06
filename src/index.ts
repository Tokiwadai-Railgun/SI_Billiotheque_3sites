declare module 'express-session' {
	interface SessionData {
		user?: {id: string, username: string}
	}
}

import express, { NextFunction, Request, Response } from 'express'
import session from "express-session";
const app = express()
const cors = require('cors');

import testRoute from './routes/testRoute'
import login  from './routes/login'
import books from "./routes/books";
import newbook from './routes/newbook';
import borrow from "./routes/borrow"
import { db } from './database'

app.use(cors())

app.use(express.json())
app.use(session({
	secret: "testSecret",
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 60000 * 60
	}
}))

// login route is special, no login required so we define it here
app.use('/login', login)

app.get('/test', (request: Request, response: Response) => {
	console.log(request.session)
	console.log(request.session.id)
	response.json({message: "Authentication success"})
})

function checkLoginMiddleware(request: Request, response: Response, next: NextFunction) {
	// Check for the session token in the database
	if (!request.session.user) {
		response.status(401).json({ "message": "not logged in" });
		return
	}
	
	console.log('Checking login state');
	next();
}

export async function checkEmployeePermissions(request: Request, response: Response, next: NextFunction) {
	// check if user is an employee
	// get rôle from database
	//
	if (!request.session.user || !request.session.user.id || !request.session.user.username) {response.status(401).json({"message": "not logged in"}); return;};
	const role = await db.selectFrom("person").select("role").where("person.id", "=", request.session.user.id).execute()

	if (role[0].role != "employee") {
		response.status(401).json({message: "Unauthorized"})
		return
	}
	next()
}


app.use(checkLoginMiddleware);
app.use("/books", books);
app.use("/newbook", newbook);
app.use("/borrow", borrow)

app.use('/test', testRoute)

// Lancement de express sur le port 3000
const port = 3000
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})
