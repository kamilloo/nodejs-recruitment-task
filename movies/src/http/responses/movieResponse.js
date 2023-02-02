exports.toResponse = (movie) => {
    return {
        title: movie.title,
        genre: movie.genre,
        released: movie.released,
        director: movie.director,
        createdAt: movie.createdAt,

    }
}

