const chai = require('chai');
const { MovieService } = require("../../../src/services/MovieService")
const {User} = require("../../../src/models/user");
var sinon = require("sinon");
const omdbApi = require("../../../src/integration/OmdbApi")
const movieRepository = require("../../../src/DAO/MovieRepository")
const {Movie} = require("../../../src/models/movie");
const {MovieDTO} = require("../../../src/models/DTO/movieDTO");
const {MovieNotFoundDTO} = require("../../../src/models/DTO/movieNotFoundDTO");

describe('MovieService', () => {

    beforeEach(async () => {
        let user = new User(1, 'name', 'basic')

    })

    afterEach(async () => {
        sinon.restore()
    })

    it('create Movie failed',  (done) => {

        //GIVEN
        let title = 'superhero'

        var omdb = sinon.stub(omdbApi, 'getByTitle');
        omdb.returns(Promise.reject(new Error('error')));


        var repository = sinon.stub(movieRepository, 'save');

        //WHEN
        let service = new MovieService();
            service.create(title)
                .then((movie) => {
                chai.expect(omdb.called).true
                chai.expect(repository.called).false
                return done()
        })
    });


    it('create Movie successful',  (done) => {

        //GIVEN
        let title = 'superhero'

        var omdb = sinon.stub(omdbApi, 'getByTitle');
        omdb.resolves(new MovieDTO(title,title,title,title));

        var repository = sinon.stub(movieRepository, 'save');
        repository.resolves(new Movie(title));

        //WHEN
        let service = new MovieService();
        service.create(title)
            .then((movie) => {

                //THEN
                chai.expect(movie.title).to.be.eql(title);
                chai.assert(omdb.called)
                chai.assert(repository.called)
                done()
            });
    });

    it('Movie was not found',  (done) => {

        //GIVEN
        let title = 'superhero'

        var omdb = sinon.stub(omdbApi, 'getByTitle');
        omdb.resolves(new MovieNotFoundDTO('error'));

        var repository = sinon.stub(movieRepository, 'save');

        //WHEN
        let service = new MovieService();
        service.create(title)
            .then((movieDto) => {
                //THEN
                chai.expect(movieDto.valid()).false;
                chai.expect(omdb.called).true
                chai.expect(repository.called).false
                done()
            });
    });

})