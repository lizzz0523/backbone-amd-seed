define([
	'jquery',
	'underscore'
], function($, _) {

	return function() {
		var self = this,

			$list = self.$('.list'),
			
			tmpl = [
				'<% for(var i = 0; i < data.length; i++){ %>',
					'<li><%= data[i] %></li>',
				'<% } %>'
			].join(''),

			data = [
				'liz',
				'foo',
				'bar'
			];

		$list.html(_.template(tmpl, {variable: 'data'})(data));
	};

});