define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, b) {

    var Main = b.View.extend({
            events : {
                'click [data-nav]' : '_navigate'
            },

            initialize : function(options) {
                var self = this;

                self.app = options.app;

                self.bind();
            },

            bind : function() {
                var self = this,
                    app = self.app;

                self.listenTo(app, 'route', self._highlight);

                return self;
            },

            setElement : function(el) {
                var self = this,
                    res;

                res = b.View.prototype.setElement.call(self, el);

                self.$nav = self.$('[data-nav]');
                self.$view = self.$('[data-view]');

                return res;
            },

            render : function(html) {
                var self = this;

                self.$view.html(html);

                return self;
            },

            _navigate : function(event) {
                var self = this,
                    name = $(event.currentTarget).data('nav');

                event.stopPropagation();

                self._highlight(name);
            },

            _highlight : function(name) {
                var self = this,

                    $nav = self.$nav,
                    $target = self.$('[data-nav=' + name + ']');

                $nav.removeClass('active');
                $target.addClass('active');
            }
        }),

        App = b.Router.extend({
            initialize : function() {
                var self = this;
            },

            bootstrap : function(elem) {
                var self = this;

                self.view = new Main({
                    app : self,
                    el  : elem
                });

                if (!b.history.started) {
                    b.history.start();
                }

                return self;
            },

            when : function(path, name, config) {
                var self = this,
                    templateUrl,
                    controllerUrl;

                if (_.isObject(name)) {
                    config = name;
                    name = path;
                };

                templateUrl = config.templateUrl;
                controllerUrl = config.controllerUrl;

                if (templateUrl.indexOf('.html') !== templateUrl.length - 5) {
                    templateUrl = 'text!../' + templateUrl + '.html';
                }

                self.route(path, name, function() {
                    var args = Array.prototype.slice.call(arguments, 0);

                    require([templateUrl, controllerUrl], function(html, ctrl) {
                        self._render(html);
                        // wait for dom ready
                        _.defer(function() {
                            self._apply(ctrl, args);
                        });
                    });
                });

                return self;
            },

            otherwise : function(config) {
                var self = this;

                if ('redirectTo' in config) {
                    self.route('*error', 'error', function() {
                        self.path(config.redirectTo);
                    });
                } else {
                    self.when('*error', 'error', config);
                }

                return self;
            },

            path : function(url) {
                var self = this;

                self.navigate(url, {trigger : true});

                return self;
            },

            $ : function(selector) {
                var self = this,
                    view = self.view;

                return view.$(selector);
            },

            _render : function(html) {
                var self = this,
                    view = self.view;

                view.render(html);

                return self;
            },

            _apply : function(ctrl, args) {
                var self = this;

                if (_.isFunction(ctrl)) {
                    ctrl.apply(self, args);
                } else {
                    throw Error('Controller isn\'t a Function');
                }

                return self;
            }
        });

    return new App();

});