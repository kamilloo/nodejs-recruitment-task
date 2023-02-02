const chai = require('chai');
const { MovieService } = require("../../../src/services/MovieService")
const {User} = require("../../../src/models/user");
var sinon = require("sinon");
const omdbApi = require("../../../src/integration/OmdbApi")
const movieRepository = require("../../../src/DAO/MovieRepository")
const moviePolicyService = require("../../../src/services/MoviePolicyService")

const {Movie} = require("../../../src/models/movie");
const {MovieDTO} = require("../../../src/models/DTO/movieDTO");
const {MovieNotFoundDTO} = require("../../../src/models/DTO/movieNotFoundDTO");
const { BASIC } = require("../../../src/models/descriptors/UserRole")

describe('MovieService', () => {

    beforeEach(async () => {
        let user = new User(1, 'name', BASIC)

    })

    afterEach(async () => {
        sinon.restore()
    })

    it('create Movie failed',  (done) => {

        //GIVEN
        let title = 'superhero'

        var omdb = sinon.stub(omdbApi, 'getByTitle');
        omdb.returns(Promise.reject(new Error('error')));

        var policy = sinon.stub(moviePolicyService, 'monthlyLimitExceed');
        policy.returns(false);


        var repository = sinon.stub(movieRepository, 'save');

        //WHEN
        let service = new MovieService();
            service.create(title)
                .then((movie) => {
                chai.expect(omdb.called).true
                chai.expect(policy.called).true
                chai.expect(repository.called).false
                return done()
        })
    });


    it('create Movie successful',  (done) => {

        //GIVEN
        let title = 'superhero'

        var omdb = sinon.stub(omdbApi, 'getByTitle');
        omdb.resolves(new MovieDTO(title,title,title,title));

        var policy = sinon.stub(moviePolicyService, 'monthlyLimitExceed');
        policy.returns(false);

        var repository = sinon.stub(movieRepository, 'save');
        repository.resolves(new Movie(title));

        //WHEN
        let service = new MovieService();
        service.create(title)
            .then((movie) => {

                //THEN
                chai.expect(movie.title).to.be.eql(title);
                chai.assert(omdb.called)
                chai.expect(policy.called).true
                chai.assert(repository.called)
                done()
            });
    });

    it('Movie was not found',  (done) => {

        //GIVEN
        let title = 'superhero'

        var omdb = sinon.stub(omdbApi, 'getByTitle');
        omdb.resolves(new MovieNotFoundDTO('error'));

        var policy = sinon.stub(moviePolicyService, 'monthlyLimitExceed');
        policy.returns(false);

        var repository = sinon.stub(movieRepository, 'save');

        //WHEN
        let service = new MovieService();
        service.create(title)
            .then((movieDto) => {
                //THEN
                // chai.expect(movieDto.valid()).false;
                chai.expect(policy.called).true
                chai.expect(omdb.called).true
                chai.expect(repository.called).false
                done()
            });
    });

    it('create Movie failed when monthly Limit Exceed',  (done) => {

        //GIVEN
        let title = 'superhero'

        var omdb = sinon.stub(omdbApi, 'getByTitle');

        var policy = sinon.stub(moviePolicyService, 'monthlyLimitExceed');
        policy.returns(true);

        var repository = sinon.stub(movieRepository, 'save');

        //WHEN
        let service = new MovieService();
        service.create(title)

        //THEN
        chai.expect(policy.called).true
        chai.expect(omdb.called).false
        chai.expect(repository.called).false
        done()
    });

})