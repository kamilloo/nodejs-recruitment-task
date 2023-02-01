const {Movie} = require("../models/movie");
getall = () => {
    //@todo pagination
    return new Promise((resolve, reject) => {
        resolve([
            new Movie('title 1'),
            new Movie('title 2')
        ]);
    });
}

save = (newMovie) => {
    return new Promise((resolve, reject) => {
        resolve(newMovie);
    });
}

module.exports = {
    getall,
    save
}