var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {



  let fromValidate = {}

  fromValidate.username = req.body.user.username.trim()
  fromValidate.password = req.body.user.password.trim()


  for (const [key, value] of Object.entries(req.body.user)) {

    if (!checkBodyInput(value)) return res.json({ error: 1, txt: `somthing wrong with ${key + value}` })
  }


  req.dbPOOL.checkUserSign(fromValidate).then((result) => {

    if (result == 0) {
      res.json({ error: 2 });
    } else {

      req.session.user = fromValidate;
      console.log(req.session.id)
      req.session.save((err)=>{
        console.log(err)
        res.json({ username:fromValidate.username })
      })
    
    }


  }).catch((err) => {

    console.log(err)
    res.json({
      error: 1,
      txt: "An error has occured"
    });
  });


});



function checkBodyInput(value) {
  if (value && value.length > 3)
    return true
  else
    return false

}

module.exports = router;
