import { NextFunction, Request, Response, Router } from "express";
const router = Router()

function loginMiddleware(request: Request, response: Response, next: NextFunction) {
		const body = request.body;
		const userName = body.name;

		if (!userName) {
				response.status(400).json({message: "Missing property in the body"});
		}
		next();
}

router.post('/', loginMiddleware, (req: Request, res: Response) => {
		console.log(req.session)
		const body = req.body;
		req.session.user = {username: "test", id: "1"};
		console.log("Body is ", body);
		res.json({token: "sample"})
})

export default router;
