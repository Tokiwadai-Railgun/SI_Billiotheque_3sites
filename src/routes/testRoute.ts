import { Request, Response, Router } from "express";

import { getById } from "../handlers/testHandler"

const router = Router()


router.get('/', (req: Request, res: Response) => {
		res.json({message: "This is the test request"})
})

router.get('/:id', (req: Request, res: Response) => {
		getById(req, res);
})

router.post('/', (req: Request, res: Response) => {
		res.json({message: "Post request received"});
})

export default router;
