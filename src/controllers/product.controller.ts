import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import APIController from "../utils/apiController";

class ProductController extends APIController {
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { name, price }: { name: string; price: number } = req.body;
      const product = await prisma.product.create({
        data: { name, price },
      });
      return res
        .status(201)
        .json({ message: "Successfully Created!", data: product });
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
      const products = await prisma.product.findMany();
      return res.status(200).json({ data: products });
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
      const product = await prisma.product.findFirst({
        where: { id },
      });
      if (!product) return res.status(404).json({ message: "Not Found" });
      return res.status(200).json(product);
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
      const { name, price }: { name: string; price: number } = req.body;
      const product = await prisma.product.findFirst({ where: { id } });
      if (!product) return res.status(404).json({ message: "Not Found" });
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { name, price },
      });
      return res
        .status(200)
        .json({ message: "Successfully Updated!", data: updatedProduct });
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
      await prisma.product.delete({ where: { id } });
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err: any) {
      return res.status(400).json({
        message: "Error",
        error: err.message,
      });
    }
  };
}

export default new ProductController();
