var Answer = require('../models/Answer');

var controller = {
    createAnswer: function(answer, cb){
        console.time('createAnswer');
        var newAnswer = new Answer({
            UserName: answer.UserName,
            Index: answer.Index,
            DocID:answer.DocID,
            PFRUS: answer.PFRUS,
            InFRUS: answer.InFRUS,
            SICResult: answer.SICResult,
            PDFLink:answer.PDFLink,
            Year: answer.Year,
            Answer_FRUS_Rate: answer.Answer_FRUS_Rate,
            Answer_FRUS_Features: answer.Answer_FRUS_Features,
            Answer_FRUS_Note: answer.Answer_FRUS_Note
        });
        newAnswer.save(function (err) {
            if (err) {
                console.log(err);
                console.timeEnd('createAnswer');
                cb({status: 500, content: err});
            } else {
                console.log('createAnswer!');
                console.timeEnd('createAnswer');
                cb({status: 200, content: null});
            }
        });
    },

    findAnswers: function (cb) {
        console.time('findAnswers');
        Answer.find(function (err, answers) {
            if (err) {
                console.error(err);
                console.timeEnd('findAnswers');
                cb({status: 404, content: err});
            }else{
                console.log(answers);
                console.timeEnd('findAnswers');
                cb({status: 200, content: answers});
            }
        });
    },

    findAnswerById: function (id, cb) {
        console.time('findAnswerById');
        Answer.find({ _id: id }, function(err, answer){
            if (err) {
                console.error(err);
                console.timeEnd('findAnswerById');
                cb({status: 404, content: err});
            }else{
                console.log(answer);
                console.timeEnd('findAnswerById');
                cb({status: 200, content: answer});
            }
        });
    },

    findAnswerByDocID: function (docId, cb) {
        console.time('findAnswerByDocID');
        Answer.find({ DocID: docId }, function(err, answer){
            if (err) {
                console.error(err);
                console.timeEnd('findAnswerByDocID');
                cb({status: 404, content: err});
            }else{
                console.log(answer);
                console.timeEnd('findAnswerByDocID');
                cb({status: 200, content: answer});
            }
        });
    },

    findAnswerByIndex: function (index, cb) {
        console.time('findAnswerByIndex');
        //First one: db.csv.find().sort({_id: 1}).limit(1).skip(0).pretty()
        Answer.find().sort({_id: 1}).limit(1).skip(index-1).exec(function(err, answer){
            if (err) {
                console.error(err);
                console.timeEnd('findAnswerByIndex');
                cb({status: 404, content: err});
            }else{
                console.log(answer);
                console.timeEnd('findAnswerByIndex');
                cb({status: 200, content: answer});
            }
        });
    },
     
     //upsert
     findAnswerAndUpsert: function (answer, cb) {
        console.time('findAnswerAndUpsert');
        //when Answer intialize,  a new _id is generated, issue with the (immutable) field '_id' was found to have been altered to _id:
        //Solution: https://stackoverflow.com/questions/31775150/node-js-mongodb-the-immutable-field-id-was-found-to-have-been-altered/32563554
        var objToUpdate = {};
        objToUpdate = Object.assign(objToUpdate, answer._doc);
        delete objToUpdate._id;
        Answer.findOneAndUpdate({UserName: answer.UserName, DocID: answer.DocID}, objToUpdate, {upsert:true}, function(err, doc){
            if (err) {
                console.error(err);
                console.timeEnd('findAnswerAndUpsert');
                cb({status: 404, content: err});
            }else{
                console.log(doc);
                console.timeEnd('findAnswerAndUpsert');
                cb({status: 200, content: objToUpdate});
            }
        });
    }

    //...
}


module.exports = controller;