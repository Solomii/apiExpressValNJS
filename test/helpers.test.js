process.env.NODE_ENV = 'test';

const request = require('supertest');
const { User } = require('../model/user');
const chai = require('chai');
const  chaiHttp = require('chai-http');
const { app } = require('../app');
const should = chai.should();

chai.use(chaiHttp);

const user = {
      _id: null,
      first_name: "Solomiia",
      last_name: "Kush",
      age: 43,
      email: "fdfg@gmail.com",
      password: "12345tgf678"
      
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
        user._id = res.body.user._id
        console.log("created user with ID = "+user._id);
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

describe('/register/:id', () => {
      it('it should DELETE a user given the id', (done) => {
                chai.request(app)
                  .delete('/register/' + user._id)
                  .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.have.property('message').eql('User successfully remove!');
                  done();
                });
      });
})
