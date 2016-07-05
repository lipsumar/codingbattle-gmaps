function getDistance(lat1, long1, lat2, long2) {
 var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(long2-long1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}


function deg2rad(deg) {
  return deg * (Math.PI/180)
}


function findNearestDefribilator(userLat, userLong, listOfPoints) {
    var bestDefibrillatorIndex;
    var bestDist = Number.MAX_SAFE_INTEGER;
    var curIndex = 0;
        console.log("listOfPoints.length ="+listOfPoints.length)

  for (curIndex = 0; curIndex < listOfPoints.length; curIndex++) {
    var curDefrib = listOfPoints[curIndex];
    console.log("Testing ["+curIndex + "]"+ curDefrib.Nom)
    var curLat = parseFloat(curDefrib.Latitude.replace(",", "."));
    var curLong = parseFloat(curDefrib.Longitude.replace(",", "."));
    var curDist =  getDistance(userLat, userLong, curLat, curLong)
     console.log("curDist = "+ curDist)
    if (curDist < bestDist) {
        console.log("find new best distance =" + curDist)
        bestDist = curDist;
        bestDefibrillatorIndex = curIndex;
    }
    }
    return listOfPoints[bestDefibrillatorIndex];
}

module.exports = {findNearestDefribilator:findNearestDefribilator}