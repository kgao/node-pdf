var express = require('express');
var router = express.Router();
var pdfController = require('../controllers/pdfController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.query.style == 'cable1'){
      pdfController.loadPDF(req.query.url, function(e){
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "X-Requested-With");
        // res.header("content-type", "text/pdf");
        //res.send(e.content);
        res.render('cable1', { title: 'Cable', e: e });
      });
  }else{
    res.render('cable2', { title: 'Cable', url: req.query.url });
  }
  
});

module.exports = router;
