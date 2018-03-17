const fs = require('fs');
const csv= require('csvtojson');
//loads the csv module referenced above.
var controller = {
  loadCSV:function(csv_path, cb){
    var inputPath= csv_path;
    var result = [];
    csv()
    .fromFile(inputPath)
    .on('json',(jsonObj)=>{
        // combine csv header row and csv line to a json object
        console.log(jsonObj);
        result.push(jsonObj);
    })
    .on('done',(error)=>{
        console.log('end')
        cb({status: 200, content: result});
    });
  }
}


module.exports = controller;