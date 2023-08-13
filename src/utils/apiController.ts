import { NextFunction, Request, Response } from "express";

abstract class APIController {
  abstract findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
  abstract findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
  abstract create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
  abstract update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
  abstract destroyOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}

export default APIController;
