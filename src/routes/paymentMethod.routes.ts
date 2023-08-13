import { Router } from "express";
import paymentMethodController from "../controllers/paymentMethod.controller";
import APIRouter from "../utils/apiRouter";

const paymentMethodRoutes: Router = APIRouter(paymentMethodController);

export default paymentMethodRoutes;
