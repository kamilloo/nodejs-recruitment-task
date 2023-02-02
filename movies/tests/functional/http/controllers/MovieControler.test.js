const express = require('express');
const chai = require('chai');
const request = require('supertest');
const app = require('../../../../src/server');
const jwt = require("jsonwebtoken");
const {User} = require("../../../../src/models/user");
const {Movie} = require("../../../../src/models/movie");
const movieRepository = require("../../../../src/DAO/MovieRepository");

const omdbApi = require("../../../../src/integration/OmdbApi")
const sinon = require("sinon");
const {MovieDTO} = require("../../../../src/models/DTO/movieDTO");
const {BASIC} = require("../../../../src/models/descriptors/UserRole");




describe('Movies', () => {

    let token = null;
    let user = null

    beforeEach(async () => {

        await movieRepository.destroy()
        user = new User(1, 'name', BASIC)
        let secret = 'secret'
        process.env.JWT_SECRET = 'secret'
        token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
                role: user.role,
            }, secret)
    })

    afterEach(async () => {
        token = null;
        user = null
        sinon.restore()
        await movieRepository.destroy()

    })

    it('getting all Movies successful',   (done) => {

        //GIVEN
        const newMovie = new Movie('title 1','genre',new Date(),'director',user.id)
        movieRepository.save(newMovie).then(() => {
            //WHEN
            request(app)
                .get('/movies')
                .set('Authorization', `Bearer ${token}`)
                .then((res) => {

                    //THEN
                    chai.expect(res.status).to.be.eql(200);
                    chai.expect(res.body.data).to.be.length(1);
                    chai.expect(res.body.data[0].title).to.be.eql('title 1');
                    return done()
                });
        })

    });

    it('getting all Movies failed when authentication error',  (done) => {

        //WHEN
        request(app)
            .get('/movies')
            .end((err, res) => {

                //THEN
                chai.expect(res.status).to.be.eql(401);
                done()
            });
    });

    it('create Movie successful',  (done) => {

        //GIVEN
        let entryData = {
            title: 'Superhero',
        };

        var omdb = sinon.stub(omdbApi, 'getByTitle');
        omdb.resolves(new MovieDTO(entryData.title,'genre',new Date(),'director'));

        //WHEN
        request(app)
            .post('/movies')
            .set('Authorization', `Bearer ${token}`)
            .send(entryData)
            .then((res) => {

                //THEN
                chai.expect(res.status).to.be.eql(201);
                chai.expect(res.body.data.title).to.be.eql(entryData.title);
                done()
            });
    });

    it('create movie failed when validation error',  (done) => {

        //GIVEN
        let entryData = {};

        //WHEN
        request(app)
            .post('/movies')
            .send(entryData)
            .set('Authorization', `Bearer ${token}`)
            .end((err,res) => {

                let errors = res.body.errors
                //THEN
                chai.expect(res.status).to.be.eql(422);
                chai.expect(errors.title[0]).to.be.eql('The title field is required.');
                done()
            });
    });

    it('create movie failed when authentication error',  (done) => {

        //WHEN
        request(app)
            .post('/movies')
            .end((err, res) => {

                //THEN
                chai.expect(res.status).to.be.eql(401);
                done()
            });
    });


})