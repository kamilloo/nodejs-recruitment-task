const {Movie} = require("../models/movie");
getall = (userId) => {
    //@todo pagination
    return new Promise((resolve, reject) => {
        if (userId == 1){
            return resolve([
                new Movie('title 1'),
            ]);
        }
        return resolve([]);
    });
}

inMonthCount = (userId) => {
    return new Promise((resolve, reject) => {
        if (userId == 1){
            return resolve(1);
        }
        return resolve(6);
    });
}

save = (newMovie) => {
    return new Promise((resolve, reject) => {
        resolve(newMovie);
    });
}

module.exports = {
    getall,
    save,
    inMonthCount
}