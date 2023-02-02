require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const openApiOptions = require("./config/open-api")
const moviesRouter = require("./routes/movies")

const { JWT_SECRET, OMDB_API_KEY, APP_PORT } = process.env;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET .env var. Set it and restart the server");
}

if (!OMDB_API_KEY) {
  throw new Error("Missing OMDB_API_KEY .env var. Set it and restart the server");
}

const app = express();
app.use(bodyParser.json());

const specs = swaggerJsdoc(openApiOptions(APP_PORT));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a string.
 */
app.get("/", (req, res) => res.json({message: "Welcome to Movies App!"}));
app.use(moviesRouter);

app.listen(APP_PORT, () => {
  console.log(`Movie Api running at port ${APP_PORT}`);
});

module.exports = app