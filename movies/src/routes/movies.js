const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const { createMovieRequest }  = require("../http/requests/createMovieRequest")

const movieController = require('../http/controllers/movieController');

router.get('/movies', auth,  movieController.get);
router.post('/movies', auth, createMovieRequest, movieController.create);

module.exports = router