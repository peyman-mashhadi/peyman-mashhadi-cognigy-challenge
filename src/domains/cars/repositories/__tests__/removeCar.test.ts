import { CarModel } from "../../model/car";
import { createCar } from "../createCar";
import { removeCar } from "../removeCar";
import { DB } from "../../../../common/db/testMongodb";
import { ObjectID } from "bson";
import { findCarById } from "../findCarById";

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
