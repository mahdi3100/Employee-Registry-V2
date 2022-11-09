const { MongoClient, ServerApiVersion } = require('mongodb');


// Connection URL
//const url = 'mongodb://localhost:27017';
//const client = new MongoClient(url);

// Database Name
const dbName = 'DBEmployee-Registry'//''test'//'DBEmployee-Registry';


//Connect to cloud Atlas
const uri = "mongodb+srv://wechrak:aGd7Lszf6weCzQz@cluster0.nf6qdh7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });


class mydb {

  //Save DB instance as class attribute 
  connectDB = null;

  constructor() {
    (async () => {
      try {
        await client.connect();
        console.log('Connected successfully to Atlas server');
        const db = client.db(dbName);
        // const collection = db.collection('users');//default name devicess
        //console.log(db.listCollections())
        this.connectDB = db


      } catch (err) {
        console.log(err)
      }
    })()
  }

  //Get all users for Home page
  getAllUsers() {
    return new Promise((resolve, reject) => {

      (async () => {
        try {

          const user = await this.connectDB.collection("users");




          user.find({}, { projection: { password: 0, comments: 0 } }).sort({ _id: -1 }).toArray(function (err, result) {
            if (err) reject(err);
            resolve(result)

          });




        } catch (err) {

          console.log(err)
          reject(err)

        }
      })()
    })
  }


  //Insert New user for Signup page
  /**
   * 
   * @param {Object} datauser 
   * @param {String} creatededit "create"| "update"
   * @param {String} EditUsernameProfile Null | "username"
   * @returns 
   */
  insertUpdateUser(datauser, creatededit, EditUsernameProfile) {
    return new Promise((resolve, reject) => {

      (async () => {
        try {

          const user = await this.connectDB.collection("users");

          if (creatededit == "update") {
            
            //update document of user 
           await user.updateOne(
              { username: EditUsernameProfile },
              { $set: datauser }

            );

            //update the user of all emmbaded document of comments 
            await user.updateMany({
              "comments.user": EditUsernameProfile
            },
              { $set:{
                "comments.$[everyuser].user":datauser.username
                },
              },
                { arrayFilters: [ { "everyuser.user": EditUsernameProfile } ] }
              

            )
       

            return resolve(datauser)
            //return is mondatory
          }


          //Add document into users collection for that sepecif new user
          datauser["comments"] = []
          //Insert user into users collection
          let result = await user.insertOne(datauser)

          console.log(`A document was inserted with the _id: ${result.insertedId}`);
          resolve(result)


        } catch (err) {
          console.log("rggggg")
          console.log(err)
          reject(err)

        }
      })()
    })
  }


  /**
   * Insert New users by CSV File into Collection users 
   * @param {Array<Object>} dataCSV 
   * @returns 
   */
  insertCSV(dataCSV) {
    return new Promise((resolve, reject) => {

      (async () => {
        try {

          const user = await this.connectDB.collection("users");
          await user.insertMany(dataCSV)
          resolve(dataCSV)


        } catch (err) {

          console.log(err)
          reject(err)

        }
      })()
    })
  }


  /**
   * Get profile
   * @param {String} username 
   * @returns 
   */
  getProfile(username) {
    return new Promise((resolve, reject) => {

      (async () => {
        try {

          const user = await this.connectDB.collection("users");



          let query = {
            $and: [
              { username: { $eq: username } },
            ]
          }
          let result = await user.findOne(query)


          resolve(result)


        } catch (err) {

          console.log(err)
          reject(err)

        }
      })()
    })
  }

  /**
   * Insert Comment into Users commection
   * @param {String} comment 
   * @param {String} username 
   * @param {String} adminUsername 
   * @returns 
   */
  inserComment(comment, username, adminUsername) {
    return new Promise((resolve, reject) => {

      (async () => {
        try {

          const user = await this.connectDB.collection("users");



          let getDate = new Date();
          let result = await user.update({ username: username }, {
            $push: {
              "comments": {
                user: adminUsername,
                txt: comment,
                date: new Date(),

              }
            }
          })
          //push created date into result
          result.date = getDate;

          resolve(result)


        } catch (err) {

          console.log(err)
          reject(err)

        }
      })()
    })
  }
  /**
   * Delete user From users collection
   * @param {String} username 
   * @returns 
   */
  deleteUser(username) {
    return new Promise((resolve, reject) => {

      (async () => {
        try {

          const user = await this.connectDB.collection("users");



          let query = { username: { $eq: username } }


          let result = await user.deleteOne(query)


          resolve(result)


        } catch (err) {

          console.log(err)
          reject(err)

        }
      })()
    })
  }
  /**
   * 
   * @param {String} datauser 
   * @returns 
   */
  checkUserSign(datauser) {
    return new Promise((resolve, reject) => {

      (async () => {
        try {

          const user = await this.connectDB.collection("users");



          let query = {
            $and: [
              { username: { $eq: datauser.username } },
              { password: { $eq: datauser.password } }
            ]
          }
          let result = await user.find(query).count()


          resolve(result)


        } catch (err) {

          console.log(err)
          reject(err)

        }
      })()
    })
  }

}


module.exports = mydb;    