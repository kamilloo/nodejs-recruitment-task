const axios = require('axios');
const pino = require('pino')
const omdbParser = require('./OmdbParser')
const omdbQueryParams = require('./OmdbQueryParams')
const {MovieNotFoundDTO} = require("../models/DTO/movieNotFoundDTO");

const logger = pino({level: process.env.LOGGER_LEVEL || 'fatal'})

getByTitle = (title) => {

    const params = omdbQueryParams.build(title);
    return axios.get(`http://www.omdbapi.com/?${params}`)
        .then(resp => {
            logger.info(resp.data);
            return omdbParser.parse(resp.data)
        }).catch(err => {
            logger.error(err);
            return new MovieNotFoundDTO(err.message)
        });
}
module.exports = { getByTitle }
