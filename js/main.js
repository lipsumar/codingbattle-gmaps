var Backbone = require('backbone'),
	$ = require('jquery');
var CONFIG = require('./config');




var App = Backbone.View.extend({
	initialize: function(){
		$.when(
			this.loadGoogleMaps(),
			this.loadDefebrilators(),
			this.askForUserLocation()
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
		$.getJSON('./Defibrillators.json', function(resp){
			console.log(arguments);
			self.defebrilators = resp;
			promise.resolve();
		});
		return promise;
	},

	askForUserLocation: function(){
		var self = this;
		var promise = $.Deferred();
		navigator.geolocation.getCurrentPosition(function(pos){
			console.log(pos);
			self.userPosition = pos;
			promise.resolve();
		});
		return promise;
	},


	start: function(){
		this.displayMap();

		// add current pos point
		var marker = new google.maps.Marker({
			position: {
				lat: this.userPosition.coords.latitude,
				lng: this.userPosition.coords.longitude
			},
			map: this.map,
			title: 'You are dying here'
		});


		//var closestDefeb = getClosestDefeb(this.defebrilators);
		var closestDefeb = this.defebrilators[0];

		if(closestDefeb){
			// add current pos point
			var marker = new google.maps.Marker({
				position: {
					lat: parseFloat(closestDefeb.Latitude.split(',').join('.')),
					lng: parseFloat(closestDefeb.Longitude.split(',').join('.'))
				},
				map: this.map,
				title: 'Get here or die'
			});
		}

	},

	displayMap: function(){
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: this.userPosition.coords.latitude,
				lng: this.userPosition.coords.longitude
			},
			zoom: 14
		});
	}
});





window.app = new App();