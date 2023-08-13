import { Router } from "express";
import addressController from "../controllers/address.controller";
import APIRouter from "../utils/apiRouter";

const addressRoutes: Router = APIRouter(addressController);

export default addressRoutes;
