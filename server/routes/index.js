var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET Index React page. */
router.get('/', function (req, res, next) {

 
      res.sendFile(path.join(__dirname, 'build/index.html'));
    
   
});
module.exports = router;






