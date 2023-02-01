const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const openApiOptions = require("./config/open-api")
const moviesRouter = require("./routes/movies")

const PORT = 3000;
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  // throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const { OMDB_API_KEY } = process.env;

if (!OMDB_API_KEY) {
  throw new Error("Missing OMDB_API_KEY env var. Set it and restart the server");
}

const app = express();
app.use(bodyParser.json());

const specs = swaggerJsdoc(openApiOptions(PORT));
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

app.listen(PORT, () => {
  console.log(`Movie Api running at port ${PORT}`);
});

module.exports = app