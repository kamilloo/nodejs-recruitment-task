require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const openApiOptions = require("./config/open-api")
const moviesRouter = require("./routes/movies")

const { JWT_SECRET, OMDB_API_KEY, DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, APP_PORT } = process.env;
if (!JWT_SECRET || !OMDB_API_KEY || !DB_HOST || !DB_DATABASE || !DB_USER || !DB_PASSWORD ) {
  throw new Error("Missing some .env var. Check env.example, set them and restart the server");
}

const app = express();
app.use(bodyParser.json());

const specs = swaggerJsdoc(openApiOptions(APP_PORT));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.get("/", (req, res) => res.json({message: "Welcome to Movies App!"}));
app.use(moviesRouter);

app.listen(APP_PORT, () => {
  console.log(`Movie Api running at port ${APP_PORT}`);
});

module.exports = app