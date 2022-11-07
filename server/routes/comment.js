var express = require('express');
var router = express.Router();

/* Post /comment */
router.post('/', function (req, res, next) {
  
  let getComment = req.body.comment;
  
  //Check Comment Value 
  if (!getComment || getComment.length < 1) {
    return res.json({ error: 1, txt: "Comment is not valid" })

  }


  //Check if user is logged
  if (!req.session.user) {
    return res.json({ error: 2, redirect: "auth" })// res.redirect("/auth")
  }
 

  let profileusername = req.body.username;
  let adminUsername = req.session.user.username;

  //Insert cmment in Database
  req.dbPOOL.inserComment(getComment, profileusername, adminUsername).then((result) => {

    if (!result.matchedCount) {
      return res.json({ error: 2, redirect: "home" })
    }

    res.json({ user: adminUsername, txt: getComment, date: result.date });
  }).catch((err) => {

    console.log(err)
    res.json({
      error: 1,
      txt: "An error has occured"
    });
  });



});

module.exports = router;