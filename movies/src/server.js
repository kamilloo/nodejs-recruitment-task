const express = require("express");
const moviesRouter = require("./routes/movies")


const bodyParser = require("body-parser");

const PORT = 3000;
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  // throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => res.json({message: "Welcome to Movies App!"}));

app.use(moviesRouter);

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});

module.exports = app