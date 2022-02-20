import express from "express";
import cors from "cors";
import { carRoutes } from "./domains/cars/routes";
import { connectToDatabase } from "./common/db/mongodb";
import { errorHandler } from "./common/handlers/errorMiddleware";
import {HttpException} from "./common/handlers/httpException";
import { authMiddleware } from "./common/handlers/authMiddelware";
import * as dotenv from "dotenv";

dotenv.config();
export const app = express();

export const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use(carRoutes);
app.use(errorHandler);

connectToDatabase()
  .then(() =>
    app.listen(process.env.PORT || PORT, () =>
      console.info(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((err) => {
    throw new HttpException(500, `${err}`);
  });
