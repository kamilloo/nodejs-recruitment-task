const movieRepository = require('../../DAO/MovieRepository')
const { MovieService } = require('../../services/MovieService')
const {Movie} = require("../../models/movie");
const movieTransform = require("../responses/movieResponse")

exports.get = (req, res) => {

    const { userId } = req.userId;
    return movieRepository.getall(userId)
        .then(movies => movies.map(movie => movieTransform.toResponse(movie)))
        .then(movies => res.json({data: movies}))
}

exports.create = async (req, res) => {
    const { title } = req.body;
    const { userId } = req.userId;
    let movieService = new MovieService();
    const newMovie = await movieService.create(title, userId);
    if (newMovie instanceof Movie){
        return res.status(201).json({
            data: movieTransform.toResponse(newMovie)
        });
    }
    return res.status(417).send({
        message: 'Adding Movie failed'
    })
}