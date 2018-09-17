module.exports = function(app) {

   var Controller = require('./../../controller/Settings/Department.controller.js');

   app.post('/API/Settings/Department/Department_List', Controller.Department_List);
   app.post('/API/Settings/Department/Department_SimpleList', Controller.Department_SimpleList);

};