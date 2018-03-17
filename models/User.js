/**
 * Models are fancy constructors compiled from our Schema definitions. 
 * Instances of these models represent 
 * 
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {   
        name: String, 
        type: String 
    }
);

//Mongoose#model(name, [schema], [collection], [skipInit])
var User = mongoose.model('User', schema, 'users');

module.exports = User;