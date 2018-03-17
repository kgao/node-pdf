var express = require('express');
var router = express.Router();
var csvController = require('../controllers/csvController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  csvController.loadCSV(req.query.path, function(e){
     res.send(e);
  });
});


module.exports = router;
