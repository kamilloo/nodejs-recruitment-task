const movieRepository = require('../../DAO/MovieRepository')
const {Movie} = require("../../models/movie");
const movieTransform = require("../responses/movieResponse")

exports.get = (req, res) => {

    // let movie = new Movie('title 1');
    return movieRepository.getall()
        .then(movies => movies.map(movie => movieTransform.toResponse(movie)))
        .then(movies => res.json({data: movies}))
}

exports.create = async (req, res) => {
    const { title } = req.body;
    const newMovie = new Movie(title);
    try {
        await movieRepository.save(newMovie);
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