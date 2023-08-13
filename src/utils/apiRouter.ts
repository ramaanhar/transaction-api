import { Router } from "express";
import APIControllerInterface from "./interfaces/apiControllerInterface";

const APIRouter = (controllers: APIControllerInterface) => {
  const router: Router = Router();
  router.get("/:id", controllers.findOne);
  router.patch("/:id", controllers.update);
  router.delete("/:id", controllers.destroyOne);
  router.get("/", controllers.findAll);
  router.post("/", controllers.create);

  return router;
};

export default APIRouter;
