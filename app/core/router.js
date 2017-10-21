var express = require('express');
var fs = require('fs');

var main_controller = {};
var controllersPath = process.cwd() + '/app/controllers';

fs.readdirSync(controllersPath).forEach(function (file) {
    if (file.match(/\.js$/)) {
        main_controller[file.split('.')[0].toLowerCase()] =
            require(controllersPath + '/' + file);
    }
});

var sinema_controllers = {};
var sinema_controllersPath = process.cwd() + '/app/controllers/sinema';
fs.readdirSync(sinema_controllersPath).forEach(function (file) {
    if (file.match(/\.js$/)) {
        sinema_controllers[file.split('.')[0].toLowerCase()] =
            require(sinema_controllersPath + '/' + file);
    }
});

module.exports = function (app) {
    var router = express.Router();
    router.route('/').get(main_controller.main.index);

    router.route('/sinema/cinemaximum').get(sinema_controllers.cinemaximum.cinemaximum);
    router.route('/sinema/kanatli').get(sinema_controllers.kanatli.kanatli);
    router.route('/sinema/ozdilek').get(sinema_controllers.ozdilek.ozdilek);
    router.route('/sinema/yildiztepe').get(sinema_controllers.yildiztepe.yildiztepe);

    app.use(router);
};
