require.config({
    paths : {
        'app'                : 'app',
        'controller'         : 'app/controller',
        'model'              : 'app/model',
        'view'               : 'app/view',

        'text'               : 'vendor/text',
        'jquery'             : 'vendor/jquery',
        'underscore'         : 'vendor/underscore',
        'backbone'           : 'vendor/backbone'
    },

    map : {
        '*'                   :   {
            'jquery'     : 'jquery-private',
            'underscore' : 'underscore-private',
            'backbone'   : 'backbone-private'
        },
        'jquery-private'     : {'jquery' : 'jquery'},
        'underscore-private' : {'underscore' : 'underscore'},
        'backbone-private'   : {'backbone' : 'backbone'},
    }
});

define('jquery-private', ['jquery'], function($) {
    return $.noConflict(true);
});

define('underscore-private', ['underscore'], function(_) {
    return _.noConflict(true);
});

define('backbone-private', ['backbone'], function(b) {
    return b.noConflict(true);
});

require(['app/boot']);