var Cable = require('../models/Cable');

var controller = {
    createCable: function(cable, cb){
        console.time('createCable');
        var newCable = new Cable({
            DocID:cable.DocID,
            PFRUS: cable.PFRUS,
            InFRUS: cable.InFRUS,
            SICResult: cable.SICResult,
            PDFLink:cable.PDFLink,
            Year: cable.Year
        });
        newCable.save(function (err) {
            if (err) {
                console.log(err);
                console.timeEnd('createCable');
                cb({status: 500, content: err});
            } else {
                console.log('createCable!');
                console.timeEnd('createCable');
                cb({status: 200, content: null});
            }
        });
    },

    findCables: function (cb) {
        console.time('findCables');
        Cable.find(function (err, cables) {
            if (err) {
                console.error(err);
                console.timeEnd('findCables');
                cb({status: 404, content: err});
            }else{
                console.log(cables);
                console.timeEnd('findCables');
                cb({status: 200, content: cables});
            }
        });
    },

    findCableById: function (id, cb) {
        console.time('findCableById');
        Cable.find({ _id: id }, function(err, cable){
            if (err) {
                console.error(err);
                console.timeEnd('findCableById');
                cb({status: 404, content: err});
            }else{
                console.log(cable);
                console.timeEnd('findCableById');
                cb({status: 200, content: cable});
            }
        });
    },

    findCableByDocID: function (docId, cb) {
        console.time('findCableByDocID');
        Cable.find({ DocID: docId }, function(err, cable){
            if (err) {
                console.error(err);
                console.timeEnd('findCableByDocID');
                cb({status: 404, content: err});
            }else{
                console.log(cable);
                console.timeEnd('findCableByDocID');
                cb({status: 200, content: cable});
            }
        });
    },

    findCableByIndex: function (index, cb) {
        console.time('findCableByIndex');
        //First one: db.csv.find().sort({_id: 1}).limit(1).skip(0).pretty()
        Cable.find().sort({_id: 1}).limit(1).skip(index-1).exec(function(err, cable){
            if (err) {
                console.error(err);
                console.timeEnd('findCableByIndex');
                cb({status: 404, content: err});
            }else{
                console.log(cable);
                console.timeEnd('findCableByIndex');
                cb({status: 200, content: cable});
            }
        });
    }


    //...
}


module.exports = controller;