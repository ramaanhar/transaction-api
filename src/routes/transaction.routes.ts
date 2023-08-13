import { Router } from "express";
import transactionController from "../controllers/transaction.controller";
import APIRouter from "../utils/apiRouter";

const transactionRoutes: Router = APIRouter(transactionController);

export default transactionRoutes;
