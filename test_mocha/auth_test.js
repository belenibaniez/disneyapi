var chai    = require("chai");
var assert  = require("chai").assert;
var expect  = require("chai").expect;
let chaiHttp = require('chai-http');
const app= require('../index')

chai.use(chaiHttp);
const url= 'http://localhost:8080';


describe('Register User: ', ()=>{

    //REGISTER

    it('should create a new user',(done)=>{
        chai.request(url)
        .post('/auth/register')
        .send({
            "name":"Jeannine" ,
            "lastname":"Ruggen",
            "email":"jruggen0@twitter.com",
            "password":"password"
        })
    .end((err,res)=>{
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('success').to.equal(true)
        expect(res.body).to.have.property('message').to.equal("User created");
        expect(res.body).to.have.property('data')
                                .which.is.an('object')
                                .and.has.property('user')
                                .which.is.an('object')
                                .and.has.property('status').to.equal(true);
                                expect(res.body).to.have.property('data')
                                .which.is.an('object')
                                .and.has.property('user') .which.is.an('object')
                                .and.has.property('verified').to.equal(false);
                         
        done()
        });
   
    
    } )


    it('should not save the user(duplicate user)',(done)=>{
        chai.request(url)
        .post('/auth/register')
        .send({
            "name":"Jeannine" ,
            "lastname":"Ruggen",
            "email":"jruggen0@twitter.com",
            "password":"password"
        })
    .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('success').to.equal(false);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('errors')


        done()
        });
   
    
    } )


    it('should result in an error if there is no payload', (done) => {
        chai.request(url)
        .post('/auth/register')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body).to.have.property('success').to.equal(false);
          expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('errors')

          done()
        })
      })


      it('should result in an error if there is not email ', (done) => {
        chai.request(url)
        .post('/auth/register')
        .send({
            "name":"Jeannine" ,
            "lastname":"Ruggen",
            "email":"jruggen0",
            "password":"password"
        })
        .end((err, res) => {

          expect(res.status).to.equal(400)
          expect(res.body).to.have.property('success').to.equal(false);
          expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('errors')


          done()
        })
      })


})





describe('Login User', function() {

    //LOGIN

    it('Should success if credential is valid', function(done) {
        chai.request(url)
           .post('/auth/login')
           .send({ "email": "admin@gmail.com", "password": "password" })
           .end((err, res) => {
              expect(200);
              expect(res.body).not.to.be.empty;
              expect(res.body).to.have.property('success').to.equal(true);
              expect(res.body).to.have.property('data')
              expect(res.body.data).to.have.property('token')
              done();

           })
    }); 



    it('Should result in an error if email is invalid', function(done) {
        chai.request(url)
           .post('/auth/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ "email": "admin", "password": "password" })
           .end((err, res) => {
                 expect(res.status).to.equal(400);
                expect('Content-Type', /json/);
                expect(res.body).to.have.property('success').to.equal(false);
                expect(res.body).to.have.property('message')
                expect(res.body).to.have.property('errors')

                done();
           })
    }); 


    
    it('Should result in an error if credential is invalid', function(done) {
        chai.request(url)
           .post('/auth/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ "email": "admin@gmail.com", "password": "password123" })
           .end((err, res) => {
            expect(res.status).to.equal(401);

                expect('Content-Type', /json/);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.have.property('success').to.equal(false);
                expect(res.body).to.have.property('message')
                expect(res.body).to.have.property('errors')

                done();

           })
    }); 



    it('Should result in an error if the status of user is false', function(done) {
        chai.request(url)
           .post('/auth/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ "email": "testdelete@gmail.com", "password": "password" })
           .end((err, res) => {
            expect(res.status).to.equal(401);
                expect('Content-Type', /json/);
                expect(res.body).to.have.property('success').to.equal(false);
                expect(res.body).to.have.property('message')
                done();

           })
    }); 


    it('Should result in an error if the status of confirmed is false', function(done) {
        chai.request(url)
           .post('/auth/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ "email": "testNotVerify@gmail.com", "password": "password" })
           .end((err, res) => {
            expect(res.status).to.equal(401);
                expect('Content-Type', /json/);
                expect(res.body).to.have.property('success').to.equal(false);
                expect(res.body).to.have.property('message')
                done();

           })
    }); 
});




let token
describe('Verify User', function() {

    before((done)=> {
        let registerUser={ "name":"TestVerify" ,"lastname":"Veri","email": "testbyverify@gmail.com", "password": "password" };
        chai.request(url)
                .post('/auth/register')
                .send(registerUser)
                .end((err,res) => {
                    
                    token=res.body.data.token
                    expect(res).to.have.status(201);
                    done();
                });
    })

    //VERIFY

    it('Should success if token valid', function(done) {
        chai.request(url)
           .get(`/auth/confirm/${token}`)
           .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).not.to.be.empty;
              expect(res.body).to.have.property('success').to.equal(true);
              expect(res.body).to.have.property('message').to.equal("User verified");
              

              done();

           })
    }); 

    it('Should success if token empty', function(done) {
        chai.request(url)
           .get(`/auth/confirm/`)
           .end((err, res) => {
              expect(res.status).to.equal(404);
              done();

           })
    }); 


    it('Should success if token with invalid format', function(done) {
        chai.request(url)
           .get(`/auth/confirm/12484654ad`)
           .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.property('success').to.equal(false);
              expect(res.body).to.have.property('message')
              expect(res.body).to.have.property('errors')

              done();

           })
    });


    it('Should success if token inexist', function(done) {
        chai.request(url)
           .get(`/auth/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY0MjU1MDMwMywiZXhwIjoxNjQyNTY0NzAzfQ.ILCGkEV86OAb0qDnQBXjRtVCeQHi5ZR6fUa0y5djnQ0`)
           .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.have.property('success').to.equal(false);
              expect(res.body).to.have.property('message')
              expect(res.body).to.have.property('errors')

              done();

           })
    });


    it('Should success if user verified', function(done) {
        chai.request(url)
           .get(`/auth/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY0MjU1MDMwMywiZXhwIjoxNjQyNTY0NzAzfQ.ILCGkEV86OAb0qDnQBXjRtVCeQHi5ZR6fUa0y5djnQ0`)
           .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.have.property('success').to.equal(false);
              expect(res.body).to.have.property('message')
              expect(res.body).to.have.property('errors')

              done();

           })
    });



});

