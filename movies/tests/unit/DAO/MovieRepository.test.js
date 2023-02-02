const chai = require('chai');
const { MovieService } = require("../../../src/services/MovieService")
const {User} = require("../../../src/models/user");
var sinon = require("sinon");
const omdbApi = require("../../../src/integration/OmdbApi")
const movieRepository = require("../../../src/DAO/MovieRepository")
const {Movie} = require("../../../src/models/movie");
const {MovieDTO} = require("../../../src/models/DTO/movieDTO");
const {MovieNotFoundDTO} = require("../../../src/models/DTO/movieNotFoundDTO");
const { BASIC } = require("../../../src/models/descriptors/UserRole")

describe('MovieRepository', () => {

    beforeEach(async () => {
        await movieRepository.destroy()
    })

    afterEach(async () => {
        await movieRepository.destroy()
    })

    it('Skip Other\'s Movies',  (done) => {

        //GIVEN
        let user = new User(1, 'name', BASIC)
        let other = new User(2, 'other', BASIC)
        const newMovie = new Movie('title','genre',new Date(),'director',other.id)
        movieRepository.save(newMovie)
            //WHEN
            .then(() => movieRepository.getall(user.id))
            .then((movies) => {
                //THEN
                chai.expect(movies.data).length(0);
                done()
            });
    });


    it('Get User\'s Movies',  (done) => {

        //GIVEN
        let user = new User(1, 'name', BASIC)
        const newMovie = new Movie('title','genre',new Date(),'director',user.id)
        movieRepository.save(newMovie)
            //WHEN
            .then(() => movieRepository.getall(user.id))
            .then((movies) => {

                //THEN
                chai.expect(movies.data).length(1);
                chai.expect(movies.data[0]).be.instanceof(Movie);
                done()
            });
    });
});

describe('Count monthly User\'s Movies', () => {

    beforeEach(async () => {
        await movieRepository.destroy()
    })

    afterEach(async () => {
        await movieRepository.destroy()
    })

    it('count current month',  (done) => {

        //GIVEN
        let user = new User(1, 'name', BASIC)
        const newMovie = new Movie('title','genre',new Date(),'director',user.id)
        movieRepository.save(newMovie)
            //WHEN
            .then(() => movieRepository.inMonthCount(user.id))
            .then((movies) => {
                //THEN
                chai.expect(movies).to.be.eql(1);
                done()
            });
    });

    it('skip previous months',  (done) => {

        //GIVEN
        let user = new User(1, 'name', BASIC)
        const newMovie = new Movie('title','genre',new Date(),'director',user.id)
        const previous_month_date = new Date('2000-01-01');
        movieRepository.save(newMovie)
            .then((movie) => movieRepository.find(newMovie))
            .then((movie) => {
                newMovie.id = movie.id;
                newMovie.createdAt = previous_month_date;
                return movieRepository.update(newMovie)
            })
            .then((movie) => movieRepository.inMonthCount(user.id))
            .then((movies) => {

                //THEN
                chai.expect(movies).to.be.eql(0);
                done()
            });
    });
    it('skip Other\'s Movies',  (done) => {

        //GIVEN
        let user = new User(1, 'name', BASIC)
        let other = new User(2, 'name 2', BASIC)
        const newMovie = new Movie('title','genre',new Date(),'director',other.id)
        movieRepository.save(newMovie)
            //WHEN
            .then(() => movieRepository.inMonthCount(user.id))
            .then((movies) => {

                //THEN
                chai.expect(movies).to.be.eql(0);
                done()
            });
    });

})