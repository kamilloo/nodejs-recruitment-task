
const {Movie} = require("../models/movie");
exports.getall = () => {
    return new Promise((resolve, reject) => {
        resolve([
            new Movie('title 1'),
            new Movie('title 2')
        ]);
    });
}

exports.save = (newMovie) => {
    return newMovie
}