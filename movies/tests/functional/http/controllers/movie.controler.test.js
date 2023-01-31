const express = require('express');
const chai = require('chai');
const request = require('supertest');
const app = require('../../../../src/server');

describe('Movies', () => {
    // beforeEach(async () => {
    //
    // })
    //
    // afterEach(async () => {
    //
    // })

    it('getting all Movies successful',   (done) => {

        //GIVEN
        //to movies

        //WHEN
        request(app)
            .get('/movies')
            .expect(200)
            .then((res) => {

                //THEN
                chai.expect(res.status).to.be.eql(200);
                chai.expect(res.body.data).to.be.length(2);
                chai.expect(res.body.data[0].title).to.be.eql('title 1');
                chai.expect(res.body.data[1].title).to.be.eql('title 2');
                return done()
            });
    });

    it('create Movie successful',  (done) => {

        //GIVEN
        let entryData = {
            title: 'Superhero',
            body: "Superhero best movie"
        };

        //WHEN
        request(app)
            .post('/movies')
            .send(entryData)
            .end((err,res) => {

                //THEN
                chai.expect(res.status).to.be.eql(201);
                chai.expect(res.body.message).to.be.eql('Welcome to Movies App!');
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
            .end((err,res) => {

                //THEN
                chai.expect(res.status).to.be.eql(422);
                // chai.expect(res.body.errors).to.be.eql('Welcome to Movies App!');
                done()
            });
    });

})