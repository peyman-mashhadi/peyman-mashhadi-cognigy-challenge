import { CarModel } from "../../model/car";
import { createCar } from "../create-car";
import { removeCar } from "../remove-car";
import { DB } from "../../../../common/db/test-mongodb";
import { ObjectID } from "bson";
import { findCarById } from "../find-car-by-id";

describe("removeCar", () => {
  beforeAll(() => DB.connect());

  afterAll(() => DB.close());

  afterEach(() => CarModel.deleteMany({}));

  it("should remove a car from DB", async () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
      price: 29000,
    };

    const createdCar = await createCar(input);
    expect(createdCar._id).toEqual(expect.any(ObjectID));

    const removedCar = await removeCar(createdCar._id);
    expect(removedCar).toBeDefined();
    expect(removedCar?.price).toEqual(29000);

    await expect(findCarById(createdCar._id)).rejects.toThrow(
      `Error: Car with id ${createdCar._id} not found`
    );
  });
});
