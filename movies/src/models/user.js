class User {
    constructor(id, name, role) {
        this._id = id;
        this._name = name;
        this._role = role;

    }
    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }
    get role(){
        return this._role
    }
}

module.exports = { User }