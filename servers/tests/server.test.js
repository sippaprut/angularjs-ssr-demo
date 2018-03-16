const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
let { Hero } = require('./../models/hero');
let { heroes } = require('./../seeks/heroes.js');
let _ = require('lodash');

before(function() {
    Hero.deleteMany().then((res) =>{
        Hero.insertMany(heroes , (error, docs) => {});
    } , (err) => {
        console.log(err);
    })
});

describe('POST /hero/' , () => {
    it ('Should error if empty data' , (done) => {
        request(app)
        .post('/hero')
        .expect(400)
        .end( (err , res) => { 
			if (err) return done(err);
			done();
		});
    });

    it ('Should add  success' , (done) => {
        let data = {
            name : "Test Hero"
        };
        request(app)
        .post('/hero')
        .send(data)
        .expect(200)
        .end( (err , res) => { 
			if (err) return done(err);
			done();
		});
    });

});

describe('GET /Hero/{ID}' , () => {
    it ('Should error if id is invalid' , (done) => {
        request(app)
        .get('/hero/12345')
        .expect(401)
        .end( (err , res) => { 
			if (err) return done(err);
			done();
		})
    });

    it ('Should error can not found Hero' , (done) => {
        request(app)
        .get('/hero/5a5dc1d2b99b6d4e78d6127f')
        .expect(404)
        .end( (err , res) => { 
			if (err) return done(err);
			done();
		})
    });

    it ('Should be fine' , (done) => {
        request(app)
        .get('/hero/5a72f116821f58535832803a')
        .expect(200)
        .end( (err , res) => {
            if (err) return done(err);
			done();
        });
    });
});

describe('PATCH /Hero/' , () => {
    
    it ('Should error if id is invalid' , (done) => {
        let data = {
            _id : '12345' ,
            name : "Narco" ,
            no: "1"
        };
        
        request(app)
        .put('/hero/')
        .send(data)
        .expect(401)
        .end( (err , res) => { 
			if (err) return done(err);
			done();
		})
    });

    it ('Should be update is fine' , (done) => {
        let data = {
            _id : '5a72f1ad821f58535832803b' ,
            name : "Narco1" ,
            no: "5"
        };
        request(app)
        .put('/hero/')
        .send(data)
        .expect(200)
        .end( (err , res) => {
            if (err) return done(err);
			done();
        });
    });
});

describe('Delete /Hero/' , () => {
    it ('Should error if id is invalid' , (done) => {
       
        request(app)
        .delete('/hero/12345')

        .expect(401)
        .end( (err , res) => { 
			if (err) return done(err);
			done();
		})
    });

    it ('Should delete is success' , (done) => {
        request(app)
        .delete('/hero/5a72f1ad821f58535832803b')
        .expect(200)
        .end( (err , res) => { 
			if (err) return done(err);
			done();
		});
    });
});