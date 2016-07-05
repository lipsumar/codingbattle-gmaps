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
		var self = this;
		this.displayMap();

		this.addUserMarker(this.userPosition);

		//var closestDefeb = getClosestDefeb(this.defebrilators);
		var closestDefeb = this.defebrilators[0];

		this.addDefibMarker(closestDefeb, './img/pictogram-din-e017-defibrillator.png');

		this.defebrilators.forEach(function(defib){
			self.addDefibMarker(defib, './img/pictogram-din-e017-defibrillator_bleh.png');
		});

	},

	addDefibMarker: function(defib, icon){
		// add current pos point
		var marker = new google.maps.Marker({
			position: {
				lat: parseFloat(defib.Latitude.split(',').join('.')),
				lng: parseFloat(defib.Longitude.split(',').join('.'))
			},
			map: this.map,
			title: 'Get here or die',
			icon: icon
		});
	},

	addUserMarker: function(pos){

		// add current pos point
		var marker = new google.maps.Marker({
			position: {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			},
			map: this.map,
			title: 'You are dying here'
		});
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