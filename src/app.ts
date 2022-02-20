import express from "express";
import cors from "cors";
import { carRoutes } from "./domains/cars/routes";
import { connectToDatabase } from "./common/db/mongodb";
import { errorHandler } from "./common/handlers/error-middleware";
import { HttpException } from "./common/handlers/http-exception";
import { authMiddleware } from "./common/handlers/auth-middelware";
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
