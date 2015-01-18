define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, b) {
    
    var List = b.View.extend({
            template : _.template([

                '<% for(var i = 0; i < data.length; i++){ %>',
                    '<li>',
                        '<h3><%= data[i].title %></h3>',
                        '<p><%= data[i].description %></p>',
                    '</li>',
                '<% } %>'

            ].join(''), {variable: 'data'}),

            initialize : function() {
                var self = this;

                self.bind();
            },

            bind : function() {
                var self = this,
                    data = self.collection;

                self.listenTo(data, 'reset', self.render);

                return self;
            },

            render : function() {
                var self = this,

                    $elem = self.$el,

                    tmpl = self.template,
                    data = self.collection;

                $elem.html(tmpl(data.toJSON()));

                return self;
            }
        });

    return List;

});