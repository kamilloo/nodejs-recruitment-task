const {MovieDTO} = require("./movieDTO");

class MovieNotFoundDTO extends MovieDTO{

    constructor(errorMessage) {
        super();
        this._errorMessage = errorMessage;
    }

    valid(){
        return false;
    }

    get errorMessage(){
        return this._errorMessage;
    }

    get title(){
        throw new Error(this.errorMessage)
    }

    get genre(){
        throw new Error(this.errorMessage)
    }

    get released(){
        throw new Error(this.errorMessage)
    }

    get director(){
        throw new Error(this.errorMessage)
    }

}

module.exports = { MovieNotFoundDTO }