const chai = require('chai');
const {MovieDTO} = require("../../../src/models/DTO/movieDTO");

const axios = require('axios');
const omdbParser = require('../../../src/integration/OmdbParser')
const omdbQueryParams = require('../../../src/integration/OmdbQueryParams')

var sinon = require("sinon");
const omdbApi = require("../../../src/integration/OmdbApi")

describe('OmdbApi', () => {

    afterEach(async () => {
        sinon.restore()
    })

    it('Grab Movie Details successful',  (done) => {

        //GIVEN
        let title = 'superhero'

        var params = sinon.stub(omdbQueryParams, 'build');
        params.returns('queryString');

        var parser = sinon.stub(omdbParser, 'parse');
        parser.returns(new MovieDTO());

        var curl = sinon.stub(axios, 'get');
        curl.resolves('raw data');

        //WHEN
        omdbApi.getByTitle(title)
            .then((movieDto) => {

                //THEN
                chai.expect(movieDto.valid()).true
                chai.assert(params.called)
                chai.assert(curl.called)
                chai.assert(parser.called)
                done()
            });
    });


    it('Grab Movie Details failed',  (done) => {

        //GIVEN
        let title = 'superhero'

        var params = sinon.stub(omdbQueryParams, 'build');
        params.returns('queryString');

        var parser = sinon.stub(omdbParser, 'parse');
        var curl = sinon.stub(axios, 'get');
        curl.returns(Promise.reject(new Error('error')));

        //WHEN
        omdbApi.getByTitle(title)
            .then((movieDto) => {

                //THEN
                chai.expect(movieDto.valid()).false
                chai.expect(params.called).true
                chai.expect(curl.called).true
                chai.expect(parser.called).false
                done()
            });
    });

})