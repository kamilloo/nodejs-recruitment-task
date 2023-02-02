const {MovieDTO} = require("../models/DTO/movieDTO");
const {MovieNotFoundDTO} = require("../models/DTO/movieNotFoundDTO");

function isCompleted({Title, Genre, Released, Director}) {
    return Title !== undefined
    && Genre !== undefined
    && Released !== undefined
    && Director !== undefined
}

parse = (raw) => {
    const {Title, Genre, Released, Director} = raw
    const releasedDate = Date.parse(Released) || null
    if (isCompleted({Title, Genre, Released, Director})){
        return new MovieDTO(Title, Genre, releasedDate, Director)
    }
    return new MovieNotFoundDTO(raw.Error || 'Movie not found!')

}
module.exports = { parse }