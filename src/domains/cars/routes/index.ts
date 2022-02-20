import { Router } from "express";
import {
  getCars,
  addCar,
  modifyCar,
  deleteCar,
  getCarById,
  bulkAddCars,
} from "../controllers";

export const carRoutes: Router = Router();

carRoutes.get("/car", getCars);
carRoutes.post("/car", addCar);
carRoutes.post("/cars", bulkAddCars);
carRoutes.put("/car/:id", modifyCar);
carRoutes.delete("/car/:id", deleteCar);
carRoutes.get("/car/:id", getCarById);
