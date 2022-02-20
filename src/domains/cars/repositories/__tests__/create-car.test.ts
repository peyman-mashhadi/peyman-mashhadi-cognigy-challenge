import { CarModel } from "../../model/car";
import { createCar } from "../create-car";
import { DB } from "../../../../common/db/test-mongodb";
import { ObjectID } from "bson";

describe("createCar", () => {
  beforeAll(() => DB.connect());

  afterAll(() => DB.close());

  afterEach(() => CarModel.deleteMany({}));

  it("should save the car in DB", async () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
      price: 29000,
    };

    const result = await createCar(input);
    expect(result._id).toEqual(expect.any(ObjectID));
    expect(result.brand).toEqual(input.brand.toUpperCase());
  });

  it("should throw error when all the required fields are not provided", async () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
    };

    await expect(createCar(input)).rejects.toThrow(
      "Car validation failed: price: Path `price` is required."
    );
  });
});
