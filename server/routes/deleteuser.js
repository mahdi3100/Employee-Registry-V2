var express = require('express');
var router = express.Router({ mergeParams: true });
router.get("/", function (req, res) {

    //Check logged user 
    if (!req.session.user) {
        return res.redirect(`${req.headers.referer}`)
        //case serve with react server and shared on nginx/apache 
        //return res.redirect("/")
    }

    //check username value
    let getUsername = req.query.username;
    if (!checkName(getUsername)) {
        return res.redirect(`${req.headers.referer}`)
        //case serve with react server and shared on nginx/apache 
        //return res.redirect("/")
    }

    //Delete user from DB
    req.dbPOOL.deleteUser(getUsername).then((result) => {

        //if the logged user (admin) deletes his own accoun
        if (req.session.user.username == getUsername) {
            req.session.destroy()
    
        }

        return res.redirect(`${req.headers.referer}`)
        //case serve with react server and shared on nginx/apache 
        //return res.redirect("/")


    }).catch((err) => {

        console.log(err)
        return res.redirect(`${req.get('origin')}/home`)
        //case serve with react server and shared on nginx/apache 
        //return res.redirect("/home")

    });
});
function checkName(value) {
    if (/^[a-zA-Z0-9]{4,13}$/g.test(value) == true) {
        return value
    } else return false

}

module.exports = router;