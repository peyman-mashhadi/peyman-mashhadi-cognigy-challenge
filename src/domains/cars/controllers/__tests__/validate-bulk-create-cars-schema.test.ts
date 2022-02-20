import { ICar } from "../../types/car";
import { bulkCreateCarsSchema, validate } from "../schema";

describe("validate bulkCreateCars schema", () => {
  it("should validate bulkCreateCars schema and return data", () => {
    const input = [
      {
        model: "::test-model-1::",
        brand: "::test-brand-1::",
        registrationYear: 2021,
        seats: 4,
        price: 29000,
      },
      {
        model: "::test-model-2::",
        brand: "::test-brand-2::",
        registrationYear: 2022,
        seats: 2,
        price: 33000,
      },
    ];
    const result = validate(bulkCreateCarsSchema, input);
    expect(result).toEqual(input);
  });

  it("should validate bulkCreateCars schema and throw error when data is missing", () => {
    const input = [
      {
        model: "::test-model::",
        brand: "::test-brand::",
        registrationYear: 2021,
        seats: 4,
      },
    ];
    expect(() => {
      validate(bulkCreateCarsSchema, input);
    }).toThrow("Validation Error: data/0 must have required property 'price'");
  });

  it("should validate bulkCreateCars schema and throw error when data has invalid format", () => {
    expect(() => {
      validate(bulkCreateCarsSchema, { model: "::test-model::" });
    }).toThrow("Validation Error: data must be array");
  });

  it("should validate bulkCreateCars schema and throw error when extra fields provided", () => {
    const input = [
      {
        model: "::test-model-1::",
        brand: "::test-brand-1::",
        registrationYear: 2021,
        seats: 4,
        price: 29000,
      },
      {
        model: "::test-model::",
        brand: "::test-brand::",
        registrationYear: 2021,
        price: 40000,
        hi: 23,
      },
    ];
    expect(() => {
      validate(bulkCreateCarsSchema, input);
    }).toThrow("Validation Error: data/1 must NOT have additional properties");
  });

  it("should validate bulkCreateCars schema and throw error when type of fields are incorrect", () => {
    const input = [
      {
        model: "::test-model::",
        brand: "::test-brand::",
        registrationYear: 2021,
        price: 40000,
        color: 23,
      },
    ];
    expect(() => {
      validate(bulkCreateCarsSchema, input);
    }).toThrow("Validation Error: data/0/color must be string");
  });

  it("should validate bulkCreateCars schema and throw error when input array is empty", () => {
    const input: ICar[] = [];
    expect(() => {
      validate(bulkCreateCarsSchema, input);
    }).toThrow("Validation Error: data must NOT have fewer than 1 items");
  });
});
