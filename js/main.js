var Backbone = require('backbone'),
	$ = require('jquery');
var CONFIG = require('./config');
var fncs = require('./functions');




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

		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(this.map);

		this.addUserMarker(this.userPosition);

		var closestDefeb = fncs.findNearestDefribilator(this.userPosition.coords.latitude,this.userPosition.coords.longitude, this.defebrilators);
		//var closestDefeb = this.defebrilators[0];

		this.addDefibMarker(closestDefeb, './img/pictogram-din-e017-defibrillator.png');

		this.defebrilators.forEach(function(defib){
			self.addDefibMarker(defib, './img/pictogram-din-e017-defibrillator_bleh.png');
		});


		var request = {
			origin: {
				lat: this.userPosition.coords.latitude,
				lng: this.userPosition.coords.longitude
			},
			destination:{
				lat: parseFloat(closestDefeb.Latitude.split(',').join('.')),
				lng: parseFloat(closestDefeb.Longitude.split(',').join('.'))
			},
			travelMode: google.maps.TravelMode.DRIVING
		};

		directionsService.route(request, function(result, status) {
			var timeStr;
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
				try{
					timeStr = result.routes[0].legs[0].duration.text;
				}catch(err){
					timeStr = '¯\_(ツ)_/¯';
				}
				$('#text').html('driving: '+timeStr+'<br>');
			}
		});




		var request = {
			origin: {
				lat: this.userPosition.coords.latitude,
				lng: this.userPosition.coords.longitude
			},
			destination:{
				lat: parseFloat(closestDefeb.Latitude.split(',').join('.')),
				lng: parseFloat(closestDefeb.Longitude.split(',').join('.'))
			},
			travelMode: google.maps.TravelMode.WALKING
		};

		directionsService.route(request, function(result, status) {
			var timeStr;
			if (status == google.maps.DirectionsStatus.OK) {

				try{
					timeStr = result.routes[0].legs[0].duration.text;
				}catch(err){
					timeStr = '¯\_(ツ)_/¯';
				}
				$('#text').append('walking: '+timeStr+'<br>');
			}
		});




		var request = {
			origin: {
				lat: this.userPosition.coords.latitude,
				lng: this.userPosition.coords.longitude
			},
			destination:{
				lat: parseFloat(closestDefeb.Latitude.split(',').join('.')),
				lng: parseFloat(closestDefeb.Longitude.split(',').join('.'))
			},
			travelMode: google.maps.TravelMode.BICYCLING
		};

		directionsService.route(request, function(result, status) {
			var timeStr;
			if (status == google.maps.DirectionsStatus.OK) {

				try{
					timeStr = result.routes[0].legs[0].duration.text;
				}catch(err){
					timeStr = '¯\_(ツ)_/¯';
				}
				$('#text').append('BICYCLING:'+timeStr+'<br>');
			}
		});


		var request = {
			origin: {
				lat: this.userPosition.coords.latitude,
				lng: this.userPosition.coords.longitude
			},
			destination:{
				lat: parseFloat(closestDefeb.Latitude.split(',').join('.')),
				lng: parseFloat(closestDefeb.Longitude.split(',').join('.'))
			},
			travelMode: google.maps.TravelMode.TRANSIT
		};

		directionsService.route(request, function(result, status) {
			var timeStr;
			if (status == google.maps.DirectionsStatus.OK) {

				try{
					timeStr = result.routes[0].legs[0].duration.text;
				}catch(err){
					timeStr = '¯\_(ツ)_/¯';
				}
				$('#text').append('TRANSIT:'+timeStr);
			}
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