var express = require('express');
var router = express.Router();
const fs = require("fs");
const { parse } = require("csv-parse");
/* POST users listing. */
router.post('/', function (req, res, next) {

  //add check sesssion
  if (!req.session.user) {
    return res.json({ error: 2, redirect: "auth" })// res.redirect("/auth")
  }

  let getFile = req.files.csvfile;
  if (!getFile || getFile.length > 1) return res.json({ error: 1, txt: "An Error Occured" });


  let getExrension, filejoinname;

  filejoinname = getFile.name;

  getExrension = filejoinname.substr(filejoinname.lastIndexOf('.') + 1).toLowerCase();
  console.log(getExrension)
  if (getExrension != "csv") {

    return res.json({ error: 1, txt: "The file format must be CSV" });

  }


  let documents = [];
  fs.createReadStream(getFile.tempFilePath, "ascii")
    //With the value 2, the parser will skip line 1 and start at line 2
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (rows) {

      /** Require more check for CSV DATA empty Rows */
      documents.push(
        {
          firstname: rows[0], lastname: rows[1], username: rows[1] + rows[3],
          email: "N/A",
          password: null,
          address: rows[3] + ' ' + rows[4] + ' ' + rows[5] + ' ' + rows[6],
          role: rows[7],
          comments: []
        }

      )


    })
    .on("end", function () {
      /** Require more check for CSV DATA empty Rows */
      req.dbPOOL.insertCSV(documents).then((result) => {
       
        res.json(result);

      }).catch((err) => {

        console.log(err)
        res.json({
          error: 1,
          txt: "An error has occured"
        });
      });
     
    })
    .on("error", function (error) {
      console.log(error.message);
    });

});

module.exports = router;
