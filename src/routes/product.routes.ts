import { Router } from "express";
import productController from "../controllers/product.controller";
import APIRouter from "../utils/apiRouter";

const productRoutes: Router = APIRouter(productController);

export default productRoutes;
