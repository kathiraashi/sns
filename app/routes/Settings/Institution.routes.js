module.exports = function(app) {

   var Controller = require('./../../controller/Settings/Institution.controller.js');

   app.post('/API/Settings/Institution/Institution_View', Controller.Institution_View);
   app.post('/API/Settings/Institution/Institution_SimpleList', Controller.Institution_SimpleList);

};