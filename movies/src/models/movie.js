class Movie{
    _id;
    _createdAt;

    constructor(title, genre, released, director, userId) {
        this._title = title;
        this._genre = genre;
        this._released = released;
        this._director = director;
        this._userId = userId;
    }

    set id(id){
        this._id = id
    }

    set createdAt(createdAt){
        this._createdAt = createdAt
    }

    get id() {
        return this._id;
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

    get createdAt() {
        return this._createdAt;
    }
}

module.exports = { Movie }