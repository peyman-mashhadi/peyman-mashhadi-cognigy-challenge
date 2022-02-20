import { Document } from "mongoose";

export interface ICar extends Document {
  brand: string;
  model: string;
  price: number;
  registrationYear: number;
  color?: string;
  seats?: number;
  imgUrl?: string;
}

export type CreateCar = (body: Partial<ICar>) => Promise<ICar>;

export type BulkCreateCar = (body: ICar[]) => Promise<ICar[]>;

export type UpdateCar = (
  id: string,
  body: Partial<ICar>
) => Promise<ICar | null>;

export type RemoveCar = (id: string) => Promise<ICar | null>;

export type FindCarById = (id: string) => Promise<ICar | null>;
