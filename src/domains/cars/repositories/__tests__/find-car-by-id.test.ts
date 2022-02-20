import { CarModel } from "../../model/car";
import { createCar } from "../create-car";
import { updateCar } from "../update-car";
import { findCarById } from "../find-car-by-id";
import { DB } from "../../../../common/db/test-mongodb";
import { ObjectID } from "bson";

describe("findCarById", () => {
  beforeAll(() => DB.connect());

  afterAll(() => DB.close());

  afterEach(() => CarModel.deleteMany({}));

  it("should find a car in DB", async () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
      price: 29000,
    };

    const createdCar = await createCar(input);
    expect(createdCar).toBeDefined();
    expect(createdCar._id).toEqual(expect.any(ObjectID));

    const updatedCar = await updateCar(createdCar._id, { price: 31000 });
    expect(updatedCar).toBeDefined();

    const foundCar = await findCarById(createdCar._id);
    expect(foundCar).toBeDefined();
    expect(foundCar?.price).toEqual(31000);
  });

  it("should throw error if the car id does not exist", async () => {
    await expect(findCarById("::wrong_id::")).rejects.toThrow(
      "Error: Car with id ::wrong_id:: not found"
    );
  });
});
