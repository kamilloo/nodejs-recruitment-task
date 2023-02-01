const {User} = require("../models/user");
getById = (userId) => {
    return new Promise((resolve, reject) => {
        if (userId == 1){
            return resolve([
                new User(userId,'name','basic'),
            ]);
        }
        return resolve(new User(userId,'name','premium'));
    });
}

module.exports = {
    getById,
}