assArray = new Array();
redMain = [];
redAsh = [];
redBrain = [];
markers = [];

function makeArray()
{
    station = new Object();
    station.hasNorth = false;;
    station.hasSouth = true;
    station.key = 'RALE';
    assArray['Alewife Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RDAV';
    assArray['Davis Station'] = station;
    
    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RPOR';
    assArray['Porter Square Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RHAR';
    assArray['Harvard Square Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RCEN';
    assArray['Central Square Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RKEN';
    assArray['Kendall/MIT Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RMGH';
    assArray['Charles/MGH Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RPRK';
    assArray['Park St. Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RDTC';
    assArray['Downtown Crossing Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RSOU';
    assArray['South Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RBRO';
    assArray['Broadway Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RAND';
    assArray['Andrew Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RJFK';
    assArray['JFK/UMass Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RSAV';
    assArray['Savin Hill Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RFIE';
    assArray['Fields Corner Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RSHA';
    assArray['Shawmut Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = false;;
    station.key = 'RASH';
    assArray['Ashmont Station'] = station;
    
    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RNQU';
    assArray['North Quincy Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RWOL';
    assArray['Wollaston Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RQUC';
    assArray['Quincy Center Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = true;
    station.key = 'RQUA';
    assArray['Quincy Adams Station'] = station;

    station = new Object();
    station.hasNorth = true;
    station.hasSouth = false;
    station.key = 'RBRA';
    assArray['Braintree Station'] = station;
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

