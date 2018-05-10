module.exports = function(app) {

    var Controller = require('../controller/Form_Submit.controller.js');

    app.post('/API/Form_Submit/Online_Form_Submit', Controller.Online_Form_Submit);

};
