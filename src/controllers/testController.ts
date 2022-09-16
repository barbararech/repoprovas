import { Request, Response } from "express";
import * as testService from "../services/testService";

export async function newTest(req: Request, res: Response) {
  const test = req.body;

  const registeredTest = await testService.newTest(test);
  return res.status(201).send(registeredTest);
}


export async function getTestsByDiscipline(req: Request, res: Response) {
  const tests = await testService.getTestsByDiscipline();
  return res.status(201).send(tests);
}
