import dotenv from "dotenv";
dotenv.config(); // Init .env variables
import express from "express";
import { initMiddleware } from "./middleware";
import router from "./controllers";
import client from "./db/client";

// Connect to database
client.connect();

// Create server
const app: express.Application = express();

// Init middleware
initMiddleware(app);

// Init router
app.use(router);

// Start server
const { PORT } = process.env;
app.listen(PORT, (): void => {
  console.log(`listening on port ${PORT}`);
});
