const url = require("url");
const { OMDB_API_KEY } = process.env;

build = (title) => {
    const glue = '+'
    const concatedTitle = title.replace(/\s+/g,glue)
    let queryParams = { apikey: OMDB_API_KEY, t: concatedTitle };
    return new url.URLSearchParams(queryParams);

}
module.exports = { build }
