const movieRepository = require("../DAO/MovieRepository")

monthlyLimitExceed = (userId, userRole) => {
    const monthlylimit = 5
    const basicRole = 'basic';
    const premiumRole = 'premium';
    if (userRole === premiumRole) {
        return false;
    }
    return movieRepository.inMonthCount(userId)
        .then((monthCount) => (monthCount >= monthlylimit));
}

module.exports = { monthlyLimitExceed }