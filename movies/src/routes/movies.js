/**
 * @openapi
 * tags:
 *   name: Movies
 *   description: The movies managing
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id
 *         title:
 *           type: string
 *           description: The title of your movie
 *         genre:
 *           type: string
 *           description: The genre of your movie
 *         released:
 *           type: string
 *           format: date
 *           description:  The date the movie was released
 *         director:
 *           type: string
 *           description: The director of your movie
 *         createdAt:
 *           type: string
 *           format: dateTime
 *           description: The date the movie was added
 *       example:
 *         id: 1
 *         title: Superhero
 *         genre: Genre
 *         released: 2020-03-10
 *         director: John Doe
 *         createdAt: 2020-03-10 04:05:06
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Validation failed
 *         errors:
 *           type: object
 *           description: Errors
 *           properties:
 *              title:
 *                  type: array
 *                  items:
 *                    type: string
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
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *          type: integer
 *          description: The number of page
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               data:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Movie'
 *               meta:
 *                type: object
 *                properties:
 *                  page:
 *                    type: number
 *                    description: The number of page
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
 *          schema:
 *             type: object
 *             required:
 *             - title
 *             properties:
 *              title:
 *                  type: string
 *                  description: The title of your movie
 *     responses:
 *       200:
 *         description: Movie created successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       401:
 *          description: Unauthenticated Error
 *       417:
 *          description: Adding Movie failed
 *       422:
 *          description: Validation Error
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 */
router.post('/movies', auth, createMovieRequest, movieController.create);

module.exports = router