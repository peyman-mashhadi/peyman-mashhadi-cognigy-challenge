import { CarModel } from "../car";
import {
  DEFAULT_SEAT,
  MAX_REGISTRATION_YEAR,
  MIN_REGISTRATION_YEAR,
} from "../constants";

describe("Cars Schema", () => {
  it("should create a model for cars", () => {
    const getCar = (): any => ({
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      seats: 4,
      price: 29000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const car = getCar();
    const model = new CarModel(car);
    expect(model.validateSync()).toBeUndefined();
  });

  it("should throw error for missing required fields for cars", () => {
    const getCar = (): any => ({
      seats: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const car = getCar();
    const model = new CarModel(car);
    expect(model.validateSync()).toBeDefined();
    expect(model.validateSync()?.message).toMatch(
      /Car validation failed: price: Path `price` is required/
    );
    expect(model.validateSync()?.message).toMatch(
      /registrationYear: Path `registrationYear` is required/
    );
    expect(model.validateSync()?.message).toMatch(
      /model: Path `model` is required/
    );
    expect(model.validateSync()?.message).toMatch(
      /brand: Path `brand` is required/
    );
  });

  it("should set default value for seats of cars", () => {
    const getCar = (): any => ({
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 2021,
      price: 29000,
    });

    const car = getCar();
    const model = new CarModel(car);
    expect(model.validateSync()).toBeUndefined();
    expect(model.seats).toEqual(DEFAULT_SEAT);
  });

  it("should throw error when registrationYear is not in the allowed range", () => {
    const getCar = (): any => ({
      model: "::test-model::",
      brand: "::test-brand::",
      registrationYear: 20,
      price: 29000,
    });

    let car = getCar();
    let model = new CarModel(car);
    expect(model.validateSync()).toBeDefined();

    expect(model.validateSync()?.message).toMatch(
      `Car validation failed: registrationYear: Path \`registrationYear\` (20) is less than minimum allowed value (${MIN_REGISTRATION_YEAR}).`
    );

    car = { ...getCar(), registrationYear: 12345 };
    model = new CarModel(car);
    expect(model.validateSync()).toBeDefined();
    expect(model.validateSync()?.message).toMatch(
      `Car validation failed: registrationYear: Path \`registrationYear\` (12345) is more than maximum allowed value (${MAX_REGISTRATION_YEAR}).`
    );
  });
});
