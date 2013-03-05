redline = "http://mbtamap-cedar.herokuapp.com/mapper/redline.json";

locations = "http://messagehub.herokuapp.com/a3.json";

var myLat;
var myLon;

function getLoc()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLon = position.coords.longitude;
        });
    } else {
        throw "Geolocation is not enabled";
    }
}


function init() 
{
    try {
        getLoc();
    
        center = new google.maps.LatLng(myLat, myLon);
        mapOptions = {
            center: center,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), 
                                        mapOptions);
        console.log(map);
        console.log(document.getElementById("map"));
    } catch (err) {
        document.getElementById("map").innerHTML = err;
    }
}
