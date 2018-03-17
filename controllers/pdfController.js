//loads the csv module referenced above.
var https = require('https');
var pdfreader = require('pdfreader');

var controller = {
  loadPDF:function(url, cb){
    var url = url;
    var result = [];
    
    https.get(url, function(res) {
      var chunks = [];
      res.on('data', function(chunk) {
        console.log('start');
        chunks.push(chunk);
      });

      res.on("end", function() {
        console.log('downloaded');
        var result = new Buffer.concat(chunks).toString('base64');
        console.log('converted to base64');
        cb({status:200, content: result});
      });
    }).on("error", function() {
      console.log("error");
   });

  }
}


module.exports = controller;