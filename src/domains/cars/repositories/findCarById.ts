import { FindCarById, ICar } from "../types/car";
import { CarModel } from "../model/car";
import { HttpException } from "../../../common/handlers/httpException";

export const findCarById: FindCarById = async (id: string) => {
  try {
    const car: ICar | null = await CarModel.findById({ _id: id });
    if (car) return car;
    throw new HttpException(404, `Car with id ${id} not found`);
  } catch (err) {
    throw new HttpException(400, `${err}`);
  }
};
