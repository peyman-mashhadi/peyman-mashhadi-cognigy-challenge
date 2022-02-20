import Ajv from "ajv";
import { HttpException } from "../../../common/handlers/http-exception";
import {
  MAX_REGISTRATION_YEAR,
  MIN_REGISTRATION_YEAR,
} from "../model/constants";

const ajv = new Ajv();

const carProperties = {
  brand: { type: "string" },
  model: { type: "string" },
  registrationYear: {
    type: "number",
    minimum: MIN_REGISTRATION_YEAR,
    maximum: MAX_REGISTRATION_YEAR,
  },
  price: { type: "number", minimum: 0 },
  color: { type: "string" },
  seats: { type: "number", minimum: 1 },
  imgUrl: { type: "string" },
};

export const createCarsSchema = {
  type: "object",
  properties: carProperties,
  required: ["brand", "model", "price"],
  additionalProperties: false,
};

export const bulkCreateCarsSchema = {
  type: "array",
  items: createCarsSchema,
  minItems: 1,
};

export const updateCarsSchema = {
  type: "object",
  properties: { ...carProperties, id: { type: "string" } },
  required: ["id"],
  additionalProperties: false,
};

export const validate = (schema: object, data: any) => {
  const isValid = ajv.validate(schema, data);
  if (!isValid) {
    const errorMessages = ajv.errorsText();
    throw new HttpException(400, `Validation Error: ${errorMessages}`);
  }
  return data;
};
