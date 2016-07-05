var assert = require('chai').assert;
var expect = require('expect.js');

var fs = require('../js/functions.js');




describe('Functions', function() {
  describe('#findNearestDefribilator()', function() {
    it('should return HACKLEAGUE wth simple json ', function() {
        var jsonDefibrillators = require('./lightDefebrilators.json');
        var curLat = 50.855257;
        var curLong = 4.341371;
     var findDefibrillator = fs.findNearestDefribilator(curLat, curLong, jsonDefibrillators)
     expect(findDefibrillator).to.not.be(undefined);
        expect(findDefibrillator.Nom).to.contain('HACKLEAGUE');
    });
  });
});