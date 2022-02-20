import { updateCarsSchema, validate } from "../schema";

describe("validate UpdateCars schema", () => {
  it("should validate updateCars schema and return data", () => {
    const input = {
      id: "::id::",
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
      price: 29000,
    };
    const result = validate(updateCarsSchema, input);
    expect(result).toEqual(input);
  });

  it("should validate updateCars schema and throw error when id is missing", () => {
    const input = {
      model: "::test-model::",
    };
    expect(() => {
      validate(updateCarsSchema, input);
    }).toThrow("Validation Error: data must have required property 'id'");
  });

  it("should validate updateCars schema and throw error when data has invalid format", () => {
    expect(() => {
      validate(updateCarsSchema, "input");
    }).toThrow("Validation Error: data must be object");
  });

  it("should validate updateCars schema and throw error when extra fields provided", () => {
    const input = {
      id: "::id::",
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      price: 40000,
      hi: 23,
    };
    expect(() => {
      validate(updateCarsSchema, input);
    }).toThrow("Validation Error: data must NOT have additional properties");
  });

  it("should validate updateCars schema and throw error when type of fields are incorrect", () => {
    const input = {
      id: "::id::",
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      price: 40000,
      color: 23,
    };
    expect(() => {
      validate(updateCarsSchema, input);
    }).toThrow("Validation Error: data/color must be string");
  });
});
