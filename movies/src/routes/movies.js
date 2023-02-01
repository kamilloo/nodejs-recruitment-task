/**
 * @openapi
 * tags:
 *   name: Movies
 *   description: The movies managing
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - user
 *         - genre
 *         - released
 *         - director
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         title:
 *           type: string
 *           description: The title of your movie
 *          genre:
 *           type: string
 *           description: The genre of your movie
 *          released:
 *           type: string
 *           format: date
 *           description:  The date the movie was released
 *          director:
 *           type: string
 *           description: The director of your movie
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the movie was added
 *       example:
 *         id: uuid
 *         title: Superhero
 *         genre: Genre
 *         released: 2020-03-10
 *         director: John Doe
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const { createMovieRequest }  = require("../http/requests/createMovieRequest")

const movieController = require('../http/controllers/movieController');

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Lists all the movies added by authorized user
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthenticated Error
 */
router.get('/movies', auth,  movieController.get);

/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *          required:
 *          - title
 *          properties:
 *            title:
 *              type: string
 *              description: The title of your movie
 *     responses:
 *       200:
 *         description: Movie created successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *      401:
 *         description: Unauthenticated Error
 *      422:
 *         description: Validation Error
 *
 */
router.post('/movies', auth, createMovieRequest, movieController.create);

module.exports = router