declare module 'express-session' {
	interface SessionData {
		user?: {id: string, username: string}
	}
}

import express, { NextFunction, Request, Response } from 'express'
import session from "express-session";
const app = express()

import testRoute from './routes/testRoute'
import login  from './routes/login'
import books from "./routes/books";
import newbook from './routes/newbook';

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
	// if (!request.session.user) response.status(401).json({"message": "not logged in"})
	console.log(request.session)
	console.log('Checking login state')
	next()
}


app.use(checkLoginMiddleware);
app.use("/books", books);
app.use("/newbook", newbook);

app.use('/test', testRoute)

// Lancement de express sur le port 3000
const port = 3000
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})
