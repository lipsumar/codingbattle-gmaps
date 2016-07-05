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
		return $.getScript('https://maps.googleapis.com/maps/api/js?key='+CONFIG['gmap-ai-key']+'&callback=initMap');
	},

	loadDefebrilators: function(){
		return $.getJSON('./defebrilators-test.json');
	},


	start: function(){
		console.log('ready!');
	}
});

https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap



window.app = new App();