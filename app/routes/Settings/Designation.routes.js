module.exports = function(app) {

   var Controller = require('./../../controller/Settings/Designation.controller.js');

   app.post('/API/Settings/Designation/Designation_List', Controller.Designation_List);

};