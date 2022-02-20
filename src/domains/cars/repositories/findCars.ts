import { CarModel } from "../model/car";

// I wasn't sure what you mean by meta data of cars,
// so I assumed we may need some insightful data from our records
export const findCars = async (): Promise<any> => {
  const total = await CarModel.count();

  // group all the cars by their brands and return all their available models
  // along with min and max of their prices and registration's years
  const brandInsights = await CarModel.aggregate([
    {
      $group: {
        _id: { brand: "$brand" },
        count: { $sum: 1 },
        models: { $addToSet: "$model" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        minRegistrationYear: { $min: "$registrationYear" },
        maxRegistrationYear: { $max: "$registrationYear" },
      },
    },
    {
      $project: {
        brand: "$_id.brand",
        count: "$count",
        models: "$models",
        minPrice: "$minPrice",
        maxPrice: "$maxPrice",
        minRegistrationYear: "$minRegistrationYear",
        maxRegistrationYear: "$maxRegistrationYear",
        _id: 0,
      },
    },
  ]);

  // group all the cars by their registration's years and return
  // all the available brands along with min and max of their prices
  const registrationYearInsights = await CarModel.aggregate([
    {
      $group: {
        _id: { registrationYear: "$registrationYear" },
        brands: { $addToSet: "$brand" },
        count: { $sum: 1 },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $project: {
        registrationYear: "$_id.registrationYear",
        brands: "$brands",
        count: "$count",
        minPrice: "$minPrice",
        maxPrice: "$maxPrice",
        _id: 0,
      },
    },
  ]);
  const carsMetadata = {
    total,
    brandInsights,
    registrationYearInsights,
  };

  return carsMetadata;
};
