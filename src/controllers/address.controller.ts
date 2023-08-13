import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import APIController from "../utils/apiController";

class AddressController extends APIController {
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { customerId, address }: { customerId: number; address: string } =
        req.body;
      const customerAddress = await prisma.customerAddress.create({
        data: { customerId, address },
      });
      return res
        .status(201)
        .json({ message: "Successfully Created!", data: customerAddress });
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
      const customerAddresses = await prisma.customerAddress.findMany({
        include: { customer: true },
      });
      return res.status(200).json({ data: customerAddresses });
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
      const customerAddress = await prisma.customerAddress.findFirst({
        where: { id },
        include: { customer: true },
      });
      if (!customerAddress)
        return res.status(404).json({ message: "Not Found" });
      return res.status(200).json(customerAddress);
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
      const { address }: { address: string } = req.body;
      const customerAddress = await prisma.customerAddress.findFirst({
        where: { id },
      });
      if (!customerAddress)
        return res.status(404).json({ message: "Not Found" });
      const updatedCustomerAddress = await prisma.customerAddress.update({
        where: { id },
        data: { address },
      });
      return res.status(200).json({
        message: "Successfully Updated!",
        data: updatedCustomerAddress,
      });
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
      await prisma.customerAddress.delete({ where: { id } });
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };
}

export default new AddressController();
