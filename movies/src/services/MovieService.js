const {Movie} = require("../models/movie");
const pino = require('pino')
const movieRepository = require("../DAO/MovieRepository")
const omdbApi = require("../integration/OmdbApi")
const moviePolicyService = require("./MoviePolicyService")

const logger = pino({level: process.env.LOGGER_LEVEL || 'fatal'})

class MovieService {
    async create(title, userId, userRole){

        if (await monthlyLimitExceed(userId,userRole)){
            logger.error(`Monthly Limit exceed by ${userId}`)
            return Promise.resolve('Monthly Limit exceed');
        }
        let incomingMovie = null;
        return omdbApi.getByTitle(title)
            .then(movieDto => {
                if (movieDto.valid()){
                    return new Movie(movieDto.title, movieDto.genre, movieDto.released, movieDto.director, userId)
                }
                return Promise.reject(movieDto.errorMessage)
            })
            .then(movie => {
                incomingMovie = movie;
                return movieRepository.findLatest(movie)
            }).then(exists => {
                    if(exists === undefined){
                    return incomingMovie
                }
                return Promise.reject('Movie was already added')
            })
            .then(movie => movieRepository.save(movie))
            .catch((err) => {
                logger.error(err)
                return err;
            })
    }

}

async function monthlyLimitExceed(userId,userRole) {
    return await moviePolicyService.monthlyLimitExceed(userId,userRole)
}
module.exports = { MovieService }