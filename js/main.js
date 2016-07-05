var Backbone = require('backbone'),
	$ = require('jquery');
var CONFIG = require('./config');



var App = function(){
	alert('why hello!');
	this.config = CONFIG;
	this.loadGoogleMaps();


}


var App = Backbone.View.extend({
	initialize: function(){
		$.when(
			this.loadGoogleMaps(),
			this.loadDefebrilators()
		).then(this.start.bind(this));



	},


	loadGoogleMaps: function(){
		var promise = $.Deferred();
		window.gmap_initMap = function(){
			promise.resolve();
		}
		$.getScript('https://maps.googleapis.com/maps/api/js?key='+CONFIG['gmap-ai-key']+'&callback=gmap_initMap')
		return promise;
	},

	loadDefebrilators: function(){
		var self = this;
		var promise = $.Deferred();
		$.getJSON('./defebrilators-test.json', function(resp){
			console.log(arguments);
			self.defebrilators = resp;
			promise.resolve();
		});
		return promise;
	},


	start: function(){
		console.log('ready!', this.defebrilators);
	}
});

https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap



window.app = new App();