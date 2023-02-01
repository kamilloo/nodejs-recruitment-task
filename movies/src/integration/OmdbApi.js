const axios = require('axios');
const pino = require('pino')
const omdbParser = require('./OmdbParser')
const omdbQueryParams = require('./OmdbQueryParams')
const {MovieNotFoundDTO} = require("../models/DTO/movieNotFoundDTO");

const logger = pino({level: 'info'})

getByTitle = (title) => {

    const params = omdbQueryParams.build(title);
    return axios.get(`http://www.omdbapi.com/?${params}`)
        .then(resp => {
            logger.info(resp.data);
            return omdbParser.parse(resp.data)
        }).catch(err => {
            logger.info(err);
            return new MovieNotFoundDTO(err.message)
        });
}
module.exports = { getByTitle }
