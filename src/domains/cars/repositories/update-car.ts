import { ICar, UpdateCar } from "../types/car";
import { CarModel } from "../model/car";
import { HttpException } from "../../../common/handlers/http-exception";

export const updateCar: UpdateCar = async (id: string, body: Partial<ICar>) => {
  try {
    const updatedCar: ICar | null = await CarModel.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true } // return the updated doc not the original
    );
    if (updatedCar) return updatedCar;
    throw new HttpException(404, `Car with id ${id} not found`);
  } catch (err) {
    throw new HttpException(400, `${err}`);
  }
};
