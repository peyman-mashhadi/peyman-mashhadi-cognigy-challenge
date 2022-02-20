import { BulkCreateCar, ICar } from "../types/car";
import { CarModel } from "../model/car";

export const bulkCreateCars: BulkCreateCar = async (body: ICar[]) => {
  const cars = await CarModel.insertMany(body);
  return cars;
};
