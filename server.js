var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var ErrorManagement = require('./app/config/ErrorHandling.js');

var port = process.env.PORT || 5000;
var app = express();


// Process On Every Error
    process.on('unhandledRejection', (reason, promise) => {
        ErrorManagement.ErrorHandling.ErrorLogCreation('', '', '', reason);
        console.error("'Un Handled Rejection' Error Log File - " + new Date().toLocaleDateString());
    });
    process.on('uncaughtException', function (err) {
        console.log(err);
        ErrorManagement.ErrorHandling.ErrorLogCreation('', '', '', err.toString());
        console.error(" 'Un Caught Exception' Error Log File - " + new Date().toLocaleDateString());
    });


// DB Connection
   // mongoose.connect('mongodb://kathiraashi:kathir143@ds263161.mlab.com:63161/sns');
   mongoose.connect('mongodb://snsAdmin:Admin123@localhost:27017/Sns-Career-Portal');
   mongoose.connection.on('error', function(err) {
      ErrorManagement.ErrorHandling.ErrorLogCreation('', 'Mongodb Connection Error', 'Server.js - 31', err);
   });
   mongoose.connection.once('open', function() {
      console.log('SNS Database Successfully Connected');
   });


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/API/Uploads', express.static('Uploads'));


// Require routes
    require('./app/routes/Candidate.routes.js')(app);
    require('./app/routes/Settings/Institution.routes.js')(app);
    require('./app/routes/Settings/Department.routes.js')(app);
    require('./app/routes/Settings/ExamConfig.routes.js')(app);
    require('./app/routes/Settings/VacanciesConfig.routes.js')(app);
    require('./app/routes/Settings/Designation.routes.js')(app);
    require('./app/routes/Settings/ExamDetails.routes.js')(app);


app.use(express.static(__dirname + '/view/dist/'));

app.use(function(req, res) {
     res.sendFile(path.join(__dirname, '/view/dist', 'index.html'));
});


app.get('*', function(req, res, next){
   res.send('This is Server Side Page');
});


var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});