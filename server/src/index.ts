import dotenv from "dotenv";
import express from "express";

import initMiddleware from "./middleware";
import router from "./router";

// Init .env variables
dotenv.config();
const { PORT } = process.env;

// Create server
const app: express.Application = express();

// Init middleware
initMiddleware(app);

// Init router
app.use(router);

// Start server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
