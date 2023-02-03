const date = require('date-and-time')

exports.toResponse = (movie) => {
    return {
        title: movie.title,
        genre: movie.genre,
        released: movie.released ? date.format(movie.released,'YYYY-MM-DD') : 'N/A',
        director: movie.director,
        createdAt: date.format(movie.createdAt,'YYYY-MM-DD HH:mm:ss'),

    }
}

