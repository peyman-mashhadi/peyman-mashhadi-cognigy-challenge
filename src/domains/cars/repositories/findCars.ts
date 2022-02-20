import { CarModel }  from "../model/car";

export const findCars = async (): Promise<any> => {
  const carsTotal = await CarModel.count();
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
    total: carsTotal,
    brandInsights,
    registrationYearInsights,
  };

  return carsMetadata;
};
