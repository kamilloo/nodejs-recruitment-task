const express = require("express");
const router = express.Router();
const auth = require('middlewares/auth');
const movieController = require('http/controllers/movieController');


const bodyParser = require("body-parser");

const PORT = 3000;
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}
const app = express();

app.use(bodyParser.json());

router.get('/', auth, movieController.get);
router.post('/', auth, movieController.create);

module.exports = router;

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});