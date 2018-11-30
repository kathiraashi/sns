module.exports = function(app) {

   var Controller = require('./../../controller/Settings/ExamDetails.controller.js');

   app.post('/API/Settings/ExamDetails/ExamDetails_List', Controller.ExamDetails_List);

};