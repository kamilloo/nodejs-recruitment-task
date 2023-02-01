const movieRepository = require('../../DAO/MovieRepository')
const { MovieService } = require('../../services/MovieService')
const {Movie} = require("../../models/movie");
const movieTransform = require("../responses/movieResponse")

exports.get = (req, res) => {

    return movieRepository.getall()
        .then(movies => movies.map(movie => movieTransform.toResponse(movie)))
        .then(movies => res.json({data: movies}))
}

exports.create = async (req, res) => {
    const { title } = req.body;
    const { userId } = req.userId;
    try {
        let movieService = new MovieService();
        const newMovie = await movieService.create(title, userId);
        return res.status(201).json({
            data: movieTransform.toResponse(newMovie)
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}