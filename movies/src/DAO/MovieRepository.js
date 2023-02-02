const db = require('./db');
const helper = require('./helper');
const config = require('../config/database');

const {Movie} = require("../models/movie");

function toMovie() {
    return row => {
        const {id, title, genre, released, director, user_id, created_at} = row
        let movie = new Movie(title, genre, released, director, user_id);
        movie.id = id
        movie.createdAt = created_at;
        return movie
    };
}

getByUser = async (userId, page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        "SELECT id, title, genre, released, director, user_id, created_at " +
        "FROM movies WHERE user_id = ? LIMIT ?,?;",
        [userId.toString(), offset.toString(), config.listPerPage.toString()]
    );
    const data = helper.emptyOrRows(rows).map(toMovie());
    const meta = {page};

    return {
        data,
        meta
    }
}

inMonthCount = async (userId) => {
    const result = await db.query(
        "SELECT count(id) as count FROM movies WHERE user_id = ? " +
        "AND MONTH(created_at) = MONTH(CURRENT_DATE()) " +
        "AND YEAR(created_at) = YEAR(CURRENT_DATE());",
        [userId.toString()]
    );
    return result[0].count;
}

save = async (newMovie) => {
    newMovie.createdAt = new Date();;
    const insert_result = await db.query(
        "INSERT INTO movies (title, genre, released, director, user_id, created_at)" +
        "VALUES (?,?,?,?,?,?);",
        [
            newMovie.title,
            newMovie.genre,
            newMovie.released,
            newMovie.director,
            newMovie.userId,
            newMovie.createdAt,
        ]
    )
    return newMovie;
}

update = async (newMovie) => {
    const result = await db.query(
        "UPDATE movies set title = ?, genre = ?, released = ?, director = ?, user_id = ?, created_at = ? " +
        "WHERE id = ?;",
        [
            newMovie.title,
            newMovie.genre,
            newMovie.released,
            newMovie.director,
            newMovie.userId,
            newMovie.createdAt,
            newMovie.id,
        ]
    );

    let message = 'Error in updating Movie';

    if (result.affectedRows) {
        message = 'Movie updated successfully';
    }

    return {message};
}

findLatest = async (newMovie) => {
    const rows = await db.query(
        "SELECT id, title, genre, released, director, user_id, created_at " +
        "FROM movies WHERE title = ? AND  user_id = ? ORDER BY id DESC LIMIT 1;",
        [
            newMovie.title,
            newMovie.userId.toString(),
        ]
    );
    if (!rows){
        return null;
    }
    return rows.map(toMovie())[0];
}

destroy = async () => {
    const result = await db.query(
        "DELETE FROM movies WHERE 1 = 1;"
    );

    let message = 'Error in deleting Movie';

    if (result.affectedRows) {
        message = 'Movies deleted successfully';
    }

    return {message};
}

module.exports = {
    getByUser,
    save,
    inMonthCount,
    destroy,
    update,
    findLatest
}