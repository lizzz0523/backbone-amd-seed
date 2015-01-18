define([
    'jquery',
    'underscore',
    'model/ListModel',
    'view/ListView'
], function($, _, ListModel, ListView) {

    return function() {
        var self = this,

            listElem = self.$('.list').get(0),

            listModel = new ListModel(),
            listView = new ListView({
                el         : listElem,
                collection : listModel
            });

        listModel.fetch({reset : true});

        return self;
    };

});