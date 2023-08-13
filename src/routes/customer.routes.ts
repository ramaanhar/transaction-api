import { Router } from "express";
import customerController from "../controllers/customer.controller";
import APIRouter from "../utils/apiRouter";

const customerRoutes: Router = APIRouter(customerController);

export default customerRoutes;
