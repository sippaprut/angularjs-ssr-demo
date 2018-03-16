require('./config/config');

let express = require('express');
let bodyParser = require('body-parser');
let { mongoose } = require('./db/mongoose');
let _ = require('lodash');

let { Hero } = require('./models/hero');

let port = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json());// support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.use( (req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/heroes' , (req , res , next) => {
    Hero.find().then( (result) => {
        res.status(200).send(result);
    } , (err) => {
        res.status(400).send({
            status : false ,
            message : err
        });
    })
    .catch( (err) => {
        res.status(400).send({
            status : false ,
            message : err
        });
    })
});

app.post('/hero' , (req, res) => {
    let data = _.pick(req.body , ['no' , 'name']);
    let newHero = new Hero(data);
    newHero.save()
    .then( (result  ) => {
        res.status(200).send(result);
    })
    .catch( (err) => {
        res.status(400).send({
            status : false ,
            message : err
        });
    });
});

app.get('/hero/:id' , (req, res) => {

    if ( mongoose.Types.ObjectId.isValid(req.params.id) === false ) {
		res.status(401).send({
			message : 'ID is invalid'
		});
    }
    
    Hero.findById(req.params.id)
    .then( (hero) => {
        if ( hero === null) {
            res.status(404).send({
                message : 'Can not found Hero'
            });
            return;
        }
        res.status(200).send(hero);
    })
    .catch( (err) => {
        res.status(401).send({
			message : err
		});
    });
});

app.put('/hero/' , (req , res) => {
    if ( mongoose.Types.ObjectId.isValid(req.body._id) === false ) {
		res.status(401).send({
			message : 'ID is invalid'
		});
    }
    
    Hero.findByIdAndUpdate(req.body._id  , { $set : req.body} , { new : true} )
    .then( (data) => {
        res.status(200).send(data);
    })
    .catch( (err) => {
        res.status(401).send({
			message : err
		});
    });
});

app.delete('/hero/:id' , (req , res) => {
  
    if ( mongoose.Types.ObjectId.isValid(req.params.id) === false ) {
		res.status(401).send({
			message : 'ID is invalid'
		});
    }

    Hero.findByIdAndRemove(req.params.id)
    .then((doc) => {
        res.status(200).send(doc);
    })
    .catch( (err) => {
        res.status(401).send({
			message : err
		});
    });
});





app.listen(port , () => {
	console.log('Server is upon in port' + port);
	console.log("Database name is " ,  process.env.MONGODB_URI);
});

module.exports = {app};