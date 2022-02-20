import { ICar, RemoveCar } from "../types/car";
import { CarModel } from "../model/car";
import { HttpException } from "../../../common/handlers/http-exception";

export const removeCar: RemoveCar = async (id: string) => {
  try {
    const deletedCar: ICar | null = await CarModel.findByIdAndRemove(id, {
      returnOriginal: true, // return the original doc before deletion
    });
    if (deletedCar) return deletedCar;
    throw new HttpException(404, `Car with id ${id} not found`);
  } catch (err) {
    throw new HttpException(400, `${err}`);
  }
};
