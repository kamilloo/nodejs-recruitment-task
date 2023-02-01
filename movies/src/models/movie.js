class Movie{
    constructor(title, genre, released, director, userId) {
        this._title = title;
        this._genre = genre;
        this._released = released;
        this._director = director;
        this._userId = userId;
    }

    get title(){
        return this._title;
    }

    get genre(){
        return this._genre;
    }

    get released(){
        return this._released
    }

    get director(){
        return this._director
    }

    get userId() {
        return this._userId;
    }
}

module.exports = { Movie }