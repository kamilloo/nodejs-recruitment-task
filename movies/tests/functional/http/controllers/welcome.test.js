const express = require('express');
const chai = require('chai');
const request = require('supertest');
const app = require('../../../../src/server');

describe('Welcome Page', () => {
    it('should welcome user', () => {
        request(app)
            .get('/')
            .expect(200)
            .end((err,res) => {
                chai.expect(res.status).to.be.eql(200);
                chai.expect(res.body.message).to.be.eql('Welcome to Movies App!');
            });
    });

    after(done => {
        setTimeout(()=> {
            process.exit(0);
        },2000);
        done();
    })
});
