redline = "http://mbtamap-cedar.herokuapp.com/mapper/redline.json";
locations = "http://messagehub.herokuapp.com/a3.json";


var myLat;
var myLon;
var map;
var redMain = [];
var redAsh = [];
var redBrain = [];
var markers = [];
var icon = "assets/t_icon.png";

var DEBUG = true;

function getLoc()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLon = position.coords.longitude;
        });

        if(DEBUG) {
            myLat = 42.35;
            myLon = -71.06;
        }

    } else {
        throw "Geolocation is not enabled";
    }
}

function getRedPointers()
{
    pt = new google.maps.LatLng(42.39428, -71.142483);
    markers.push(new google.maps.Marker({position: pt, title:"Alewife Station", icon:icon}));
    redMain.push(pt);

    pt = new google.maps.LatLng(42.39674, -71.121815);
    markers.push(new google.maps.Marker({position: pt, title:"Davis Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.3884, -71.119149);
    markers.push(new google.maps.Marker({position: pt, title:"Porter Square Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.373362, -71.118956);
    markers.push(new google.maps.Marker({position: pt, title:"Harvard Square Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.365486, -71.103802);
    markers.push(new google.maps.Marker({position: pt, title:"Central Square Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.361166, -71.070628);
    markers.push(new google.maps.Marker({position: pt, title:"Charles/MGH Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.35639457, -71.0624242);
    markers.push(new google.maps.Marker({position: pt, title:"Park St. Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.355518, -71.055242);
    markers.push(new google.maps.Marker({position: pt, title:"South Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.342622, -71.056967);
    markers.push(new google.maps.Marker({position: pt, title:"Broadway Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.330154, -71.057655);
    markers.push(new google.maps.Marker({position: pt, title:"Andrew Station", icon:icon}));
    redMain.push(pt);
    
    pt = new google.maps.LatLng(42.320685, -71.052391);
    markers.push(new google.maps.Marker({position: pt, title:"JFK/UMass Station", icon:icon}));
    redMain.push(pt);
    redAsh.push(pt);
    redBrain.push(pt);

    
    pt = new google.maps.LatLng(42.31129, -71.053331);
    markers.push(new google.maps.Marker({position: pt, title:"Savin Hill Station", icon:icon}));
    redAsh.push(pt);
    
    pt = new google.maps.LatLng(42.275275, -71.029583);
    markers.push(new google.maps.Marker({position: pt, title:"North Quincy Station", icon:icon}));
    redBrain.push(pt);
    
    pt = new google.maps.LatLng(42.2665139, -71.0203369);
    markers.push(new google.maps.Marker({position: pt, title:"Wollaston Station", icon:icon}));
    redBrain.push(pt);
    
    pt = new google.maps.LatLng(42.300093, -71.061667);
    markers.push(new google.maps.Marker({position: pt, title:"Fields Corner Station", icon:icon}));
    redAsh.push(pt);
    
    pt = new google.maps.LatLng(42.251809, -71.005409);
    markers.push(new google.maps.Marker({position: pt, title:"Quincy Center Station", icon:icon}));
    redBrain.push(pt);
    
    pt = new google.maps.LatLng(42.29312583, -71.06573796);
    markers.push(new google.maps.Marker({position: pt, title:"Shawmut Station", icon:icon}));
    redAsh.push(pt);
    
    pt = new google.maps.LatLng(42.233391, -71.007153);
    markers.push(new google.maps.Marker({position: pt, title:"Quincy Adams Station", icon:icon}));
    redBrain.push(pt);
    
    pt = new google.maps.LatLng(42.284652, -71.064489);
    markers.push(new google.maps.Marker({position: pt, title:"Ashmont Station", icon:icon}));
    redAsh.push(pt);
    
    pt = new google.maps.LatLng(42.2078543, -71.0011385);
    markers.push(new google.maps.Marker({position: pt, title:"Braintree Station", icon:icon}));
    redBrain.push(pt);

}

function renderLine()
{
    getRedPointers();

    for (var m in markers) {
        markers[m].setMap(map);
        google.maps.event.addListener(markers[m], 'click', function() {
            alert("boo!");
        });
    }

    line = new google.maps.Polyline({
        path:redMain,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 10
    });
    line.setMap(map);
    
    lineAsh = new google.maps.Polyline({
        path:redAsh,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 10
    });
    lineAsh.setMap(map);
    
    lineBrain = new google.maps.Polyline({
        path:redBrain,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 10
    });
    lineBrain.setMap(map);
}

function init() 
{
    try {
        getLoc();
    
        
        center = new google.maps.LatLng(myLat, myLon);
        mapOptions = {
            center: center,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), 
                                        mapOptions);
        renderLine();
    } catch (err) {
        document.getElementById("map").innerHTML = err;
    }
}
