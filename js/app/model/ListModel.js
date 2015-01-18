define([
    'underscore',
    'backbone'
], function(_, b) {

    var List = b.Collection.extend({
            url : 'api/items'
        });

    return List;

});