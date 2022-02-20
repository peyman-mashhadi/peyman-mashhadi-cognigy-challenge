import { CreateCar, ICar } from "../types/car";
import { CarModel } from "../model/car";

export const createCar: CreateCar = async (body: Partial<ICar>) => {
  const car: ICar = new CarModel(body);
  const newCar: ICar = await car.save();
  return newCar;
};
