import { NextFunction, Request, Response } from "express";

export default interface APIControllerInterface {
  findAll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response>;
  findOne: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response>;
  create: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response>;
  update: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response>;
  destroyOne: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response>;
}
