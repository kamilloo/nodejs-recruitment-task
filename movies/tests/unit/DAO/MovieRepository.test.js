const chai = require('chai');
const { MovieService } = require("../../../src/services/MovieService")
const {User} = require("../../../src/models/user");
var sinon = require("sinon");
const omdbApi = require("../../../src/integration/OmdbApi")
const movieRepository = require("../../../src/DAO/MovieRepository")
const {Movie} = require("../../../src/models/movie");
const {MovieDTO} = require("../../../src/models/DTO/movieDTO");
const {MovieNotFoundDTO} = require("../../../src/models/DTO/movieNotFoundDTO");

describe('MovieRepository', () => {

    beforeEach(async () => {

    })

    afterEach(async () => {
    })

    it('Get Other\'s Movies',  (done) => {

        //GIVEN
        let user = new User(1, 'name', 'basic')
        let other = new User(2, 'other', 'basic')

        //WHEN
        movieRepository.getall(other.id)
            .then((movies) => {
                //THEN
                chai.expect(movies).length(0);
                done()
            });
    });


    it('Get User\'s Movies',  (done) => {

        //GIVEN
        let user = new User(1, 'name', 'basic')

        //WHEN
        movieRepository.getall(user.id)
            .then((movies) => {

                //THEN
                chai.expect(movies).length(1);
                done()
            });
    });

})