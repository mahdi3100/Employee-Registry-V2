var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var cors = require('cors');
//var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


/** All Rooter execpt LOGOUT */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signUpRouter = require('./routes/signup');
var signInRouter = require('./routes/signin');
var uploadRouter = require('./routes/upload');
var commentRouter = require('./routes/comment');


var deleteuserRouter = require('./routes/deleteuser');





var app = express();

var session = require('express-session');
var MemoryStore = require('memorystore')(session)
var sessionStor = new MemoryStore({checkperiod:60/*3minut*/});



var MongoConnect = require('./db/config.db');

//Create instance of mongodb that connect to Database  -  POOL  connection
var dbPOOL = new MongoConnect()

//app.use(bodyParser.urlencoded({ extended: true }))

//middleware cors
const corsOptions = {
  //Set credentials FOR SESSION SAVE
  credentials: true,
  origin: true, 
};
app.use(cors(corsOptions))



//to be able to upload file 
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp/' 
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'client/build')));



//set session middlewre
var sessionMiddlewaremahdi = session({//must
  secret: 'onlymehaha',
  rolling: true,
  resave: true,
  cookie: { httpOnly: false, secure: false, maxAge: 1440000 },
  saveUninitialized: true, 
  store:sessionStor
});
app.use(sessionMiddlewaremahdi);


//middleware to attach pool with every req 
app.use(function (req, res, next) {
  req.dbPOOL = dbPOOL; 

  //{dev env} for react url 3000 ,used for deleteuser route, in case switch deleteuser to fetch api delete this line
  //req.reactUrl = req.headers.origin

  next();
});


//END POINTS API
app.use('/', indexRouter);
app.use("/deleteuser", deleteuserRouter);



app.get("/logout", function (req, res) {
  console.log("Logout")
  if(req.session)req.session.destroy()
  res.send("0")
})


//Fetch API 
app.use('/signup', signUpRouter)
app.use('/signin', signInRouter)
app.use('/upload', uploadRouter);
app.use('/comment', commentRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));

});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
