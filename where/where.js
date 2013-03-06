redline = "http://mbtamap-cedar.herokuapp.com/mapper/redline.json";
locations = "http://messagehub.herokuapp.com/a3.json";

var redlineJson;
var locationJson;
var carmen = null;
var waldo = null;
var myLat;
var myLon;
var map;
var me;
var meMarker;
var redMain = [];
var redAsh = [];
var redBrain = [];
var markers = [];
var icon = "assets/t_icon.png";
var waldoIcon = "assets/waldo.png";
var carmenIcon = "assets/carmen.png";

function doAJAX()
{
    try {
        redRequest = new XMLHttpRequest();
        locRequest = new XMLHttpRequest();
    }
    catch (ms1) {
        try {
            redRequest = new ActiveXObject("Msxml2.XMLHTTP");
            locRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (ms2) {
            try {
                redRequest = new ActiveXObject("Microsoft.XMLHTP");
                locRequest = new ActiveXObject("Microsoft.XMLHTP");
            }
            catch (ex) {
                redRequest = null;
                locRequest = null;
            }
        }
    }

    redRequest.onreadystatechange = isReadyRed;
    locRequest.onreadystatechange = isReadyLoc;
    function isReadyRed() {
        //Checking the status code throws errors?
        if(redRequest.readystate < 4)
        {
            return;
        }
        if (redRequest.readyState === 4)
        {
            redlineJson = redRequest.responseText; 
        }
    }
    
    function isReadyLoc() {
        if(locRequest.readystate < 4)
        {
            return;
        }
        if (locRequest.readyState === 4)
        {
            locationJson = locRequest.responseText; 
            makePeople();
        }
    }
    redRequest.open('GET', redline, true);
    redRequest.send('');
        
    locRequest.open('GET', locations, true);
    locRequest.send('');
}

function getLoc()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
           
             
            myLon = position.coords.longitude;
            pt = new google.maps.LatLng(myLat, myLon);
            me = 
                new google.maps.Marker({position: pt, title:"You are here"});
            me.setMap(map);
            meMarker = me;
        
            map.setCenter(new google.maps.LatLng(myLat, myLon));
            text = findPlaces(); 
            infowindow = new google.maps.InfoWindow({
                content: text
            });
            infowindow.open(map, meMarker);
            google.maps.event.addListener(meMarker, 'click', function() {
                infowindow.open(map, meMarker);
            });
        });
    } else {
        throw "Geolocation is not enabled";
    }
}

function makePeople() {
    if (locationJson != null) {
        json = JSON.parse(locationJson);
        for (i in json) {
            people = json[i];
            if(people.name == "Carmen Sandiego") {
                carmen = new Object();
                carmen.name = people.name;
                carmen.lat = people.loc.latitude;
                carmen.lon = people.loc.longitude;
                carmen.note = people.loc.note;
                pt = new google.maps.LatLng(carmen.lat, carmen.lon);
                carmen.marker = new google.maps.Marker({position: pt,
                    title:carmen.name, icon: carmenIcon});
                carmen.marker.setMap(map);
            } else if (people.name == "Waldo") {
                waldo = new Object();
                waldo.name = people.name;
                waldo.lat = people.loc.latitude;
                waldo.lon = people.loc.longitude;
                waldo.note = people.loc.note;
                pt = new google.maps.LatLng(waldo.lat, waldo.lon);
                waldo.marker = new google.maps.Marker({position: pt,
                    title:waldo.name, icon:waldoIcon});
                waldo.marker.setMap(map);
            }               
        }
    }
}

function makePopUp(stationTitle) 
{
    station = assArray[stationTitle];
    stationNorth = station.key + 'N';
    stationSouth = station.key + 'S';
    results = JSON.parse(redlineJson);
    text = '<h3>' + stationTitle + '</h3>';
    text += '<table id="schedule"><tr><th>Trip #</th><th>Direction</th><th>Time Remaining</th></tr>';
    
    if(station.hasNorth)
    {
        for(item in results) {
            if(results[item].PlatformKey == stationNorth && results[item].InformationType == 'Predicted') {
                text += '<tr><td>' +results[item].Trip + '</td><td> North </td><td>';
                text += results[item].TimeRemaining + '</td>';

            }
        }       
    }
    if(station.hasSouth)
    {
        for(item in results) {
            if(results[item].PlatformKey == stationSouth) {
                text += '<tr><td>' + results[item].Trip + '</td><td> South </td><td>';
                text += results[item].TimeRemaining + '</td>'; 
            }
        }
    }
    text += '</table>';

    return text;
}

function renderLine()
{
    getRedPointers();

    for (m=0; m < markers.length; m++) {
        markers[m].setMap(map);
        google.maps.event.addListener(markers[m], 'click', function() {
            
            text = makePopUp(this.title);
            infowindow = new google.maps.InfoWindow({
                content: text
            });
            infowindow.open(map, this);
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

function metersToMiles(distance)
{
    return distance * 0.00062137119;
}

function findPlaces()
{

    me = new google.maps.LatLng(myLat, myLon);
    shortestT = google.maps.geometry.spherical.
        computeDistanceBetween(me, markers[0].getPosition());
    closestT = markers[0].getTitle();
    for(i = 1; i < markers.length; i++) {
        test = google.maps.geometry.spherical.
            computeDistanceBetween(me, markers[i].getPosition());
        if(test < shortestT) {
            shortestT = test;
            closestT = markers[i].getTitle();
        }
    }

    shortestT = metersToMiles(shortestT);
    text = 'Distance to ' + closestT + ' is ' + shortestT + ' miles<br />';
    if(waldo != null) { 
        distToWaldo = google.maps.geometry.spherical.
            computeDistanceBetween(me, waldo.marker.getPosition());
        distToWaldo = metersToMiles(distToWaldo);
        text += 'Waldo is ' + distToWaldo + ' miles away <br />';
    }
    if(carmen != null) {
        distToCarm = google.maps.geometry.spherical.
            computeDistanceBetween(me, carmen.marker.getPosition());   
        distToCarm = metersToMiles(distToCarm);
        text += 'Carmen is ' + distToCarm + ' miles away <br />';
    }
    
    return text;
}


function init() 
{
    try {
        makeArray();
        doAJAX();
        myLat = 42.35;
        myLon = -71.06;
        center = new google.maps.LatLng(myLat, myLon);

        mapOptions = {
            center: center,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), 
                                        mapOptions);
        renderLine();
         
        getLoc();
    } catch (err) {
        document.getElementById("map").innerHTML =
            "Sorry, there has been a problem";
    }
}
