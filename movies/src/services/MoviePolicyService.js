const movieRepository = require("../DAO/MovieRepository")
const { PREMIUM } = require("../models/descriptors/UserRole")

monthlyLimitExceed = (userId, userRole) => {
    const monthlylimit = 5
    if (userRole === PREMIUM) {
        return Promise.resolve(false);
    }
    return movieRepository.inMonthCount(userId)
        .then((monthCount) => (monthCount >= monthlylimit));
}

module.exports = { monthlyLimitExceed }