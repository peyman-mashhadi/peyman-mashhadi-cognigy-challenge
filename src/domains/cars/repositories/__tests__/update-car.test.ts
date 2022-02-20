import { CarModel } from "../../model/car";
import { createCar } from "../create-car";
import { updateCar } from "../update-car";
import { DB } from "../../../../common/db/test-mongodb";
import { ObjectID } from "bson";

describe("updateCar", () => {
  beforeAll(() => DB.connect());

  afterAll(() => DB.close());

  afterEach(() => CarModel.deleteMany({}));

  it("should update a signle property of a car in DB", async () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
      price: 29000,
    };

    const createdCar = await createCar(input);
    expect(createdCar._id).toEqual(expect.any(ObjectID));

    const updated = await updateCar(createdCar._id, { price: 31000 });
    expect(updated).toBeDefined();
    expect(updated?.price).toEqual(31000);
  });
});
