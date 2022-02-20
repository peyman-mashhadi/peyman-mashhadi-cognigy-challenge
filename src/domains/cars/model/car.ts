import { ICar } from "../types/car";
import { model, Schema, Types } from "mongoose";
import { COLLECTION_NAME, DEFAULT_SEAT, MAX_REGISTRATION_YEAR, MIN_REGISTRATION_YEAR, MODEL_NAME } from "./constants";

const carSchema: Schema = new Schema(
  {
    _id: {
      auto: true,
      type: Types.ObjectId,
      required: true,
    },
    brand: {
      type: String,
      uppercase: true,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    registrationYear: {
      type: Number,
      required: true,
      min: MIN_REGISTRATION_YEAR,
      max: MAX_REGISTRATION_YEAR,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    seats: {
      type: Number,
      default: DEFAULT_SEAT,
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

carSchema.index({
  brand: 1,
  model: 1,
});

carSchema.index({
  price: 1,
});

export const CarModel = model<ICar>(MODEL_NAME, carSchema, COLLECTION_NAME);
