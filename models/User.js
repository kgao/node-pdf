/**
 * Models are fancy constructors compiled from our Schema definitions. 
 * Instances of these models represent 
 * 
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {   
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: false }, 
        firstName: { type: String, required: false },
        lastName: { type: String, required: false }
    }
);

//Mongoose#model(name, [schema], [collection], [skipInit])
var User = mongoose.model('User', schema, 'users');

module.exports = User;