const movieRepository = require('../../DAO/MovieRepository')
const { MovieService } = require('../../services/MovieService')
const {Movie} = require("../../models/movie");
const movieTransform = require("../responses/movieResponse")

exports.get = (req, res) => {

    const { page } = req.query;
    const { userId } = req;
    return movieRepository.getByUser(userId, page || 1)
        .then(movies => {
            return {
                data: movies.data.map(movie => movieTransform.toResponse(movie)),
                meta: movies.meta
            }
        })
        .then(movies => res.json(movies))
}

exports.create = async (req, res) => {
    const { title } = req.body;
    const { userId, userRole } = req;
    let movieService = new MovieService();
    const newMovie = await movieService.create(title, userId, userRole);
    if (newMovie instanceof Movie){
        return res.status(201).json({
            data: movieTransform.toResponse(newMovie)
        });
    }
    return res.status(417).send({
        message: newMovie
    })
}