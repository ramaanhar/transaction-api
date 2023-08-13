import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import APIController from "../utils/apiController";

class PaymentMethodController extends APIController {
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { name, isActive }: { name: string; isActive: boolean } = req.body;
      const paymentMethod = await prisma.paymentMethod.create({
        data: { name, isActive },
      });
      return res
        .status(201)
        .json({ message: "Successfully Created!", data: paymentMethod });
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
      const paymentMethods = await prisma.paymentMethod.findMany();
      return res.status(200).json({ data: paymentMethods });
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
      const paymentMethod = await prisma.paymentMethod.findFirst({
        where: { id },
      });
      if (!paymentMethod) return res.status(404).json({ message: "Not Found" });
      return res.status(200).json(paymentMethod);
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
      const { name, isActive }: { name: string; isActive: boolean } = req.body;
      const paymentMethod = await prisma.paymentMethod.findFirst({
        where: { id },
      });
      if (!paymentMethod) return res.status(404).json({ message: "Not Found" });
      const updatedPaymentMethod = await prisma.paymentMethod.update({
        where: { id },
        data: { name, isActive },
      });
      return res
        .status(200)
        .json({ message: "Successfully Updated!", data: updatedPaymentMethod });
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
      await prisma.paymentMethod.delete({ where: { id } });
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };
}

export default new PaymentMethodController();
