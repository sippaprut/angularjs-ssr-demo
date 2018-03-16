let mongoose = require('mongoose');
let validator = require('validator');
let AutoIncrement = require('mongoose-sequence')(mongoose);
let _ = require('lodash');

let HeroSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true
    },
    
    no: {
        type: Number,
        default: 0
    }
    
});

HeroSchema.plugin(AutoIncrement, {inc_field: 'no'});

HeroSchema.methods.toJSON = function() {
	let hero = this;
	return _.pick(hero.toObject() , ['_id' , 'no' , 'name']);
}


let Hero = mongoose.model('Heroes' , HeroSchema);

module.exports = {
    Hero
}