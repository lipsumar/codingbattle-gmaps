var CONFIG = require('./config');
var App = function(){
	alert('why hello!');
	this.config = CONFIG;
}



window.app = new App();