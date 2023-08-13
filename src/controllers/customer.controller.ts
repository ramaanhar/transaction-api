import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import APIController from "../utils/apiController";

class CustomerController extends APIController {
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { name }: { name: string } = req.body;
      const customer = await prisma.customer.create({ data: { name } });
      return res
        .status(201)
        .json({ message: "Successfully Created!", data: customer });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const customers = await prisma.customer.findMany();
      return res.status(200).json({ data: customers });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };

  findOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = parseInt(req.params.id);
      const customer = await prisma.customer.findFirst({
        where: { id },
      });
      if (!customer) return res.status(404).json({ message: "Not Found" });
      return res.status(200).json(customer);
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = parseInt(req.params.id);
      const { name }: { name: string } = req.body;
      const customer = await prisma.customer.findFirst({ where: { id } });
      if (!customer) return res.status(404).json({ message: "Not Found" });
      const updatedCustomer = await prisma.customer.update({
        where: { id },
        data: { name },
      });
      return res
        .status(200)
        .json({ message: "Successfully Updated!", data: updatedCustomer });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };

  destroyOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = parseInt(req.params.id);
      await prisma.customer.delete({ where: { id } });
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };
}

export default new CustomerController();
