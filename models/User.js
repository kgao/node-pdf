/**
 * Models are fancy constructors compiled from our Schema definitions. 
 * Instances of these models represent 
 * 
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {   
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: false }, 
        gender: { type: String, required: false },
        address: { type: String, required: false }
    }
);

//Mongoose#model(name, [schema], [collection], [skipInit])
var User = mongoose.model('User', schema, 'users');

module.exports = User;