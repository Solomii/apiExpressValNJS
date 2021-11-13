process.env.NODE_ENV = 'test';

const expect = require('expect');
const request = require('supertest');
// const { ObjectId } = require('mongodb');
const { User } = require('../model/user');

const mongoose = require("mongoose");


const chai = require('chai');
const  chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

    const user = {
      first_name: "Solomiia",
      last_name: "Kush",
      age: 30,
      email: "ss@gmail.com",
      password: "12345678"
      
}
    
describe("User", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    })
  })
});

describe('POST /register', () => {
  it('should create a new user', (done) => {

    chai.request(app)
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('User successfully added!');
        res.body.user.should.have.property('first_name');
        res.body.user.should.have.property('last_name');
        res.body.user.should.have.property('age');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property( 'password');
        done();
      });
  });

});

describe('POST /register', () => {
  it('should return error when user exists', (done) => {
    // let user = {
    //   first_name: "Solomiia",
    //   last_name: "Kush",
    //   age: 30,
    //   email: "sa@gmail.com",
    //   password: "12345678"
      
    // }
    chai.request(app)
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('message').eql('User Already Exist. Please Login');
        done();
      });
  });

});

  // it("should create a new user", (done) => {
  //   let user = 'Test user'

  //   request(app)
  //     .post('/register')
  //     .send({ User })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.user).toBe(user)
      
  //     })
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err)
  //       }