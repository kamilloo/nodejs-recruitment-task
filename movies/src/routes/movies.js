const express = require("express");
const router = express.Router();
// const auth = require('middlewares/auth');
const createMovieRequest = require("../middlewares/validation-middleware")

const movieController = require('../http/controllers/movieController');

router.get('/movies', movieController.get);
router.post('/movies', createMovieRequest.createMovieRequest, movieController.create);
// router.post('/', auth, movieController.create);

module.exports = router