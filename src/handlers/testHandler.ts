import { Request, Response } from "express";

export function getById(request: Request, response: Response) { 
	response.json({name:"test"})
}
