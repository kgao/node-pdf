/**
 * Models are fancy constructors compiled from our Schema definitions. 
 * Instances of these models represent 
 * 
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {   
        UserName:{ type: String},
        Index: {type: Number},
        DocID: { type: String},
        PFRUS: { type: Number},
        InFRUS: { type: Number},
        SICResult: { type: String},
        PDFLink: { type: String},
        Year: { type: Number},
        Answer_FRUS_Rate: { type: Number},
        Answer_FRUS_Features: [],
        Answer_FRUS_Note: { type: String}
    }
);

//Mongoose#model(name, [schema], [collection], [skipInit])
var Answer = mongoose.model('Answer', schema, 'answers');

module.exports = Answer;