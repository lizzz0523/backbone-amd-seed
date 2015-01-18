define([
    'jquery',
    'app/index'
], function($, app) {

    app.otherwise({
        redirectTo : 'home'
    }).when('home', 'home', {  
        templateUrl   : 'tmpl/home',
        controllerUrl : 'controller/home'
    }).when('list', 'list', {
        templateUrl   : 'tmpl/list',
        controllerUrl : 'controller/list'
    });

    $(function() {
        app.bootstrap(document.body);
    });

});