const {Movie} = require("../models/movie");
const pino = require('pino')
const movieRepository = require("../DAO/MovieRepository")
const omdbApi = require("../integration/OmdbApi")

const logger = pino({level: 'info'})

class MovieService {
    create(title, userId){
        return omdbApi.getByTitle(title)
            .then(movieDto => {
                if (movieDto.valid()){
                    return new Movie(movieDto.title, movieDto.genre, movieDto.released, movieDto.director, userId)
                }
                return Promise.reject(movieDto)
            })
            .then(movie => movieRepository.save(movie))
            .catch((err) => {
                logger.info(err)
                return err
            })
    }
}

module.exports = { MovieService }