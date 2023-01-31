class Movie{

    constructor(title) {
        this._title = title;
    }

    get title(){
        return this._title;
    }
}

module.exports = { Movie }