class MovieDTO{

    constructor(title, genre, released, director) {
        this._title = title;
        this._genre = genre;
        this._released = released;
        this._director = director;
    }

    valid(){
        return true;
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
}

module.exports = { MovieDTO }