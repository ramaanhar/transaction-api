import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import TransactionInput from "../utils/interfaces/transactionInput";
import APIController from "../utils/apiController";

class TransactionController extends APIController {
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const {
        customerId,
        customerAddressId,
        productIds,
        paymentMethodIds,
      }: TransactionInput = req.body;
      const transaction = await prisma.transaction.create({
        data: {
          customerId,
          customerAddressId,
          products: {
            createMany: {
              data: productIds.map((val) => ({ productId: val })),
            },
          },
          paymentMethods: {
            createMany: {
              data: paymentMethodIds.map((val) => ({ paymentMethodId: val })),
            },
          },
        },
        include: { products: true, paymentMethods: true },
      });
      return res
        .status(201)
        .json({ message: "Successfully Created!", data: transaction });
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
      const transactions = await prisma.transaction.findMany();
      return res.status(200).json({ data: transactions });
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
      const transaction = await prisma.transaction.findFirst({
        where: { id },
      });
      if (!transaction) return res.status(404).json({ message: "Not Found" });
      return res.status(200).json(transaction);
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
      const {
        customerId,
        customerAddressId,
        productIds,
        paymentMethodIds,
      }: TransactionInput = req.body;
      const transaction = await prisma.transaction.findFirst({
        where: { id },
      });
      if (!transaction) return res.status(404).json({ message: "Not Found" });
      const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
          customerId,
          customerAddressId,
          products: {
            deleteMany: { transactionId: id },
            createMany: {
              data: productIds.map((val) => ({ productId: val })),
            },
          },
          paymentMethods: {
            deleteMany: { transactionId: id },
            createMany: {
              data: paymentMethodIds.map((val) => ({ paymentMethodId: val })),
            },
          },
        },
      });
      return res
        .status(200)
        .json({ message: "Successfully Updated!", data: updatedTransaction });
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
      await prisma.transaction.delete({ where: { id } });
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };
}

export default new TransactionController();
