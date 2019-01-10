module.exports = function(app) {

   var Controller = require('./../../controller/Settings/VacanciesConfig.controller.js');

   app.post('/API/Settings/VacanciesConfig/VacanciesConfig_List', Controller.VacanciesConfig_List);
   app.post('/API/Settings/VacanciesConfig/VacancyComplete_Details', Controller.VacancyComplete_Details);

};