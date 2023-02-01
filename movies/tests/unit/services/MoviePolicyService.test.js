const chai = require('chai');
const {User} = require("../../../src/models/user");
var sinon = require("sinon");
const movieRepository = require("../../../src/DAO/MovieRepository")
const moviePolicyService = require("../../../src/services/MoviePolicyService")


describe('Movie Policy', () => {

    beforeEach(async () => {
        let user = new User(1, 'name', 'basic')

    })

    afterEach(async () => {
        sinon.restore()
    })


    it('Monthly Limit Exceed',  (done) => {

        //GIVEN
        let user = new User(1, 'name', 'basic')
        var policy = sinon.stub(movieRepository, 'inMonthCount');
        policy.resolves(6);

        //WHEN
        moviePolicyService.monthlyLimitExceed(user.id, user.role)
            .then(monthlyLimitExceed => {
                //THEN
                chai.expect(monthlyLimitExceed).true
                done()
            })
    });

    it('Monthly Limit no Exceed',  (done) => {

        //GIVEN
        let user = new User(1, 'name', 'basic')
        var policy = sinon.stub(movieRepository, 'inMonthCount');
        policy.resolves(1);

        //WHEN
        moviePolicyService.monthlyLimitExceed(user.id, user.role)
            .then(monthlyLimitExceed => {
                //THEN
                chai.expect(monthlyLimitExceed).false
                done()
            })
    });


    it('Monthly Limit skip for premium user',  (done) => {

        //GIVEN
        let user = new User(1, 'name', 'premium')
        var policy = sinon.stub(movieRepository, 'inMonthCount');
        //WHEN
        const monthlyLimitExceed = moviePolicyService.monthlyLimitExceed(user.id, user.role)

        //THEN
        chai.expect(monthlyLimitExceed).false
        done()
    });

})