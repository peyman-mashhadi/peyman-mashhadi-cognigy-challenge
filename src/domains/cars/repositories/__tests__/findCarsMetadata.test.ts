import { CarModel } from "../../model/car";
import { bulkCreateCars } from "../bulkCreateCars";
import { DB } from "../../../../common/db/testMongodb";
import { mockCars } from "./mock";
import { findCars } from "../findCars";

describe("findCarsMetadata", () => {
  beforeAll(() => DB.connect());

  afterAll(() => DB.close());

  afterEach(() => CarModel.deleteMany({}));

  it("should return all the metadata of cars", async () => {
    const createdCars = await bulkCreateCars(mockCars);
    expect(createdCars).toBeDefined();

    const carsMetadata = await findCars();
    expect(carsMetadata).toBeDefined();
    expect(carsMetadata).toEqual({
      brandInsights: [
        {
          brand: "VOLKSWAGEN",
          count: 2,
          maxPrice: 41000,
          maxRegistrationYear: 2020,
          minPrice: 24000,
          minRegistrationYear: 2017,
          models: ["Golf Variant VII Cup BMT", "Golf VI Match*1.4 16V"],
        },
        {
          brand: "AUDI",
          count: 3,
          maxPrice: 50000,
          maxRegistrationYear: 2020,
          minPrice: 33400,
          minRegistrationYear: 2012,
          models: [
            "A4 2.0 TDI",
            "TT RS Coupé S tr 40",
            "A3 1.4TGi G-TRON S-LiNE",
          ],
        },
        {
          brand: "BMW",
          count: 3,
          maxPrice: 31000,
          maxRegistrationYear: 2021,
          minPrice: 21000,
          minRegistrationYear: 2012,
          models: [
            "Series 7 750i xDrive",
            "420xi Gran Coupe Steptronic",
            "320i Sedan Advantage LED",
          ],
        },
      ],
      registrationYearInsights: [
        {
          brands: ["VOLKSWAGEN", "AUDI"],
          count: 2,
          maxPrice: 50000,
          minPrice: 24000,
          registrationYear: 2020,
        },
        {
          brands: ["BMW"],
          count: 2,
          maxPrice: 23300,
          minPrice: 21000,
          registrationYear: 2021,
        },
        {
          brands: ["VOLKSWAGEN", "AUDI"],
          count: 2,
          maxPrice: 41000,
          minPrice: 33400,
          registrationYear: 2017,
        },
        {
          brands: ["AUDI", "BMW"],
          count: 2,
          maxPrice: 44430,
          minPrice: 31000,
          registrationYear: 2012,
        },
      ],
      total: 8,
    });
  });
});
