import {
  MAX_REGISTRATION_YEAR,
  MIN_REGISTRATION_YEAR,
} from "../../model/constants";
import { createCarsSchema, validate } from "../schema";

describe("validate createCars schema", () => {
  it("should validate createCars schema and return data", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
      price: 29000,
    };
    const result = validate(createCarsSchema, input);
    expect(result).toEqual(input);
  });

  it("should validate createCars schema and throw error when data is missing", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
    };
    expect(() => {
      validate(createCarsSchema, input);
    }).toThrow("Validation Error: data must have required property 'price'");
  });

  it("should validate createCars schema and throw error when data has invalid format", () => {
    expect(() => {
      validate(createCarsSchema, "input");
    }).toThrow("Validation Error: data must be object");
  });

  it("should validate createCars schema and throw error when extra fields provided", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      price: 40000,
      hi: 23,
    };
    expect(() => {
      validate(createCarsSchema, input);
    }).toThrow("Validation Error: data must NOT have additional properties");
  });

  it("should validate createCars schema and throw error when type of fields are incorrect", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      price: 40000,
      color: 23,
    };
    expect(() => {
      validate(createCarsSchema, input);
    }).toThrow("Validation Error: data/color must be string");
  });

  it("should validate createCars schema and throw error when registration year is less than allowed minimum", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 1121,
      price: 40000,
    };
    expect(() => {
      validate(createCarsSchema, input);
    }).toThrow(
      `Validation Error: data/registrationYear must be >= ${MIN_REGISTRATION_YEAR}`
    );
  });

  it("should validate createCars schema and throw error when registration year is more than allowed maximum", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 3000,
      price: 40000,
    };
    expect(() => {
      validate(createCarsSchema, input);
    }).toThrow(
      `Validation Error: data/registrationYear must be <= ${MAX_REGISTRATION_YEAR}`
    );
  });

  it("should validate createCars schema and throw error when number of seats is less than 1", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2000,
      price: 40000,
      seats: 0,
    };
    expect(() => {
      validate(createCarsSchema, input);
    }).toThrow(`Validation Error: data/seats must be >= 1`);
  });

  it("should validate createCars schema and throw error when price is less than 0", () => {
    const input = {
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2000,
      price: -10,
      seats: 3,
    };
    expect(() => {
      validate(createCarsSchema, input);
    }).toThrow(`Validation Error: data/price must be >= 0`);
  });
});
