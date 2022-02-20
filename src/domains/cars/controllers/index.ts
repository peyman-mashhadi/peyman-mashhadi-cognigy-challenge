import { Response, Request, NextFunction } from "express";
import { findCars } from "../repositories/find-cars";
import { findCarById } from "../repositories/find-car-by-id";
import { createCar } from "../repositories/create-car";
import { updateCar } from "../repositories/update-car";
import { removeCar } from "../repositories/remove-car";
import {
  bulkCreateCarsSchema,
  createCarsSchema,
  updateCarsSchema,
  validate,
} from "./schema";
import { bulkCreateCars } from "../repositories/bulk-create-cars";
import { ICar } from "../types/car";

const getCars = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const carsMetadata = await findCars();
    res.status(200).json(carsMetadata);
  } catch (error) {
    next(error);
  }
};

const getCarById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const car = await findCarById(req.params.id);
    res.status(200).json({ car });
  } catch (error) {
    next(error);
  }
};

const addCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = validate(createCarsSchema, req.body);
    const newCar = await createCar(body as ICar);
    res.status(201).json({ newCar });
  } catch (error) {
    next(error);
  }
};

const bulkAddCars = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = validate(bulkCreateCarsSchema, req.body);
    const newCars = await bulkCreateCars(body as ICar[]);
    res.status(201).json({ newCars });
  } catch (error) {
    next(error);
  }
};

const modifyCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const data = validate(updateCarsSchema, { ...body, id });
    const updatedCar = await updateCar(id, data as Partial<ICar>);
    res.status(200).json({ updatedCar });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedCar = await removeCar(req.params.id);
    res.status(200).json({ deletedCar });
  } catch (error) {
    next(error);
  }
};

export { getCars, addCar, modifyCar, deleteCar, getCarById, bulkAddCars };
