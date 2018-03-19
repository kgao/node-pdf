/**
 * Models are fancy constructors compiled from our Schema definitions. 
 * Instances of these models represent 
 * 
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {   
        DocID: { type: String},
        PFRUS: { type: Number},
        InFRUS: { type: Number},
        SICResult: { type: String},
        PDFLink: { type: String},
        Year: { type: Number}
    }
);

//Mongoose#model(name, [schema], [collection], [skipInit])
var Cable = mongoose.model('Cable', schema, 'csv');

module.exports = Cable;