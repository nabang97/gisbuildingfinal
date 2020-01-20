//Set up Server URL
var server = '../mobile/';
var njorong = 0; var digitjorong = [];
var task = 0;
var markers=[];
var nrumah = 0; var digitrumah = [];
var numkm = 0; var digitumkm = [];
var nibadah = 0; var digitibadah = [];
var nkantor = 0; var digitkantor = [];
var npendidikan = 0; var digitpendidikan = [];
var nkesehatan = 0; var digitkesehatan = [];
var polylinenagari;
var warnanagari = "red";
var ketebalan = 3.0;
var markersposition=[];
var markerposition;
var infoWindow, infowindow;
var currentlat,currentlng;
var tunggu;
var myStyle = [ { "featureType": "administrative", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#eeeeee" }, { "visibility": "on" } ] }, { "featureType": "poi", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [ { "weight": 1 } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] } ];
var map;
var nagariborder, batasnagari, houselayer, msmelayer, educationlayer, officelayer,worshiplayer, healthlayer;
var directionsDisplay;
var photo;
var circles = [];

function geocodePosition(pos,infoWindow) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      //console.log(markerposition);
      console.log(infowindow);
      infowindow.setContent(responses[0].formatted_address);
      updateMarkerAddress(responses[0].formatted_address);

    } else {
      updateMarkerAddress('Cannot determine address at this location.');
    }
  });
}

function updateMarkerStatus(str) {
  //infowindow.setContent(str);
  B4A.CallSub('Marker_Dragging', true, str);
}

function updateMarkerPosition(latLng) {
  // document.getElementById('info').innerHTML = [
  // 	latLng.lat(),
  // 	latLng.lng()
  // ].join(', ');
}

function updateMarkerAddress(str) {
  // document.getElementById('address').innerHTML = str;
  //B4A.CallSub('Marker_Address', true, str);
  //markerposition.info.setContent(str);

}



function CoordMapType(tileSize) {
  this.tileSize = tileSize;
}

function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '10px';
  controlUI.style.padding = '5px';
  controlUI.style.height='auto';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '13px';
  //controlText.style.padding = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    B4A.CallSub('Current_Location', true, "current_location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        // infoWindow.open(map);
        map.setCenter(pos);
        //loadMap(pos.lat,pos.lng);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

}

function createOption(text,value){
  var dropdownUI=document.createElement('option');
  dropdownUI.innerHTML=text
  dropdownUI.setAttribute("value", value);
  return dropdownUI;
}

$(document).ready(function(){
 checkLayer();
 checkNagariLayer();
 checkHouseLayer();
 checkMsmeLayer();
 checkEducationLayer();
 checkOfficeLayer();
 checkHealthLayer();
 checkWorshipLayer();
 checkJorongLayer();
 $(".sweet-loading").show();
});

function DraggerListerner(){
  google.maps.event.addListener(markerposition, 'dragstart', function() {
    updateMarkerAddress('Dragging...');
  });

  google.maps.event.addListener(markerposition, 'drag', function() {
    updateMarkerStatus('Dragging...');
    updateMarkerPosition(markerposition.getPosition());
    infowindow.setContent('Dragging...');
    infowindow.open(map,markerposition);
  });

  google.maps.event.addListener(markerposition, 'dragend', function() {
    updateMarkerStatus('Drag ended');
    geocodePosition(markerposition.getPosition(),infowindow);
    console.log( markerposition.getPosition().lat()+" | "+markerposition.getPosition().lng());
    var latnow = markerposition.getPosition().lat().toString();
    var lngnow = markerposition.getPosition().lng().toString();
    console.log(latnow+"|"+lngnow);
    //	call the B4A Sub Marker_DragEnd passing the Marker's new position
    B4A.CallSub('Marker_DragEnd', true, latnow, lngnow);
    //B4A.CallSub('Marker_DragEnd', true, marker.getPosition().lat(), marker.getPosition().lng());
  });
}

function DraggerListernerForRoute(){
  google.maps.event.addListener(markerposition, 'dragstart', function() {
    updateMarkerAddress('Dragging...');
  });

  google.maps.event.addListener(markerposition, 'drag', function() {
    updateMarkerStatus('Dragging...');
    updateMarkerPosition(markerposition.getPosition());
    infowindow.setContent('Dragging...');
    infowindow.open(map,markerposition);
  });

  google.maps.event.addListener(markerposition, 'dragend', function() {
    updateMarkerStatus('Drag ended');
    geocodePosition(markerposition.getPosition(),infowindow);
    console.log( markerposition.getPosition().lat()+" | "+markerposition.getPosition().lng());
    var currentlocation = {lat: markerposition.getPosition().lat() ,lng: markerposition.getPosition().lng()};
    directionsDisplay.setMap(null);
    var selectedValue = document.getElementById('selectTravelMode').options[selectBox.selectedIndex].value;
    callRoute(currentlocation, centerLokasi,'lightblue',""+server+"/img/"+photo+"",selectedValue);
    infowindow.setContent("Current Position");
    var latnow = markerposition.getPosition().lat().toString();
    var lngnow = markerposition.getPosition().lng().toString();
    console.log(latnow+"|"+lngnow);
    B4A.CallSub('Marker_DragEnd', true, latnow, lngnow);
  });
}

function MyLegend(){
  var modal = document.getElementById('modalContent');
    if (modal.hasChildNodes()) {
      modal.removeChild(modal.childNodes[0]);
    }
   var legendContainer = document.createElement('div');
   legendContainer.setAttribute("id","legend");
   var div = document.createElement('div');
   var isilegend = document.createElement('div');
   var content = [];
   content.push('<div class="batas nagari"></div>Nagari Border<br>');
   content.push('<div class="digit gantiang"></div>Jorong Ganting<br>');
   content.push('<div class="digit koto"></div>Jorong Koto Gadang<br>');
   content.push('<div class="digit sutijo"></div>Jorong Sutijo<br>');
   content.push('<div class="digit rumah"></div>House Building<br>');
   content.push('<div class="digit ibadah"></div>Worship Building<br>');
   content.push('<div class="digit umkm"></div>Mirco, Small, Medium, Enterprise (MSME) Building<br>');
   content.push('<div class="digit kantor"></div>Office Building<br>');
   content.push('<div class="digit pendidikan"></div>Educational Building<br>');
   content.push('<div class="digit kesehatan"></div>Health Building<br>');
   isilegend.innerHTML = content.join('');
   legendContainer.appendChild(isilegend);
   modal.appendChild(legendContainer);
   //map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendContainer);

}

function MyMapControl(controlDiv, map){
  var controlUI = document.createElement('select');
  controlUI.setAttribute("id", "selectBox");
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginLeft = '10px';
  controlUI.style.marginTop='10px';
  controlUI.style.marginRight='0';
  controlUI.style.padding = '5px';
  controlUI.style.height='auto';
  controlUI.style.fontSize='13px';
  controlUI.style.textAlign = 'center';

  controlUI.appendChild(createOption('Styled Map','mystyle'));
  controlUI.appendChild(createOption('Map','roadmap'));
  controlUI.appendChild(createOption('Satellite','satellite'));
  controlUI.appendChild(createOption('Terrain', 'terrain'));

  controlDiv.appendChild(controlUI);
  controlUI.addEventListener('change', function() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    map.setMapTypeId(selectedValue);
    console.log(selectedValue);
  });
}

function MyTravelModeControl(controlDiv, map){
  var controlTravel = document.createElement('select');
  controlTravel.setAttribute("id", "selectTravelMode");
  controlTravel.style.backgroundColor = '#fff';
  controlTravel.style.border = '2px solid #fff';
  controlTravel.style.borderRadius = '3px';
  controlTravel.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlTravel.style.cursor = 'pointer';
  controlTravel.style.marginLeft = '10px';
  controlTravel.style.marginTop='10px';
  controlTravel.style.marginRight='0';
  controlTravel.style.padding = '5px';
  controlTravel.style.height='auto';
  controlTravel.style.fontSize='13px';
  controlTravel.style.textAlign = 'center';

  controlTravel.appendChild(createOption('Driving','DRIVING'));
  controlTravel.appendChild(createOption('Walking','WALKING'));
  controlTravel.appendChild(createOption('Transit','TRANSIT'));
  controlTravel.appendChild(createOption('Bicycling','BICYCLING'));

  controlDiv.appendChild(controlTravel);
  controlTravel.addEventListener('change', function() {
      var selectBox = document.getElementById("selectTravelMode");
      var selectedValue = controlTravel.options[selectBox.selectedIndex].value;
      console.log(selectedValue);
      directionsDisplay.setMap(null);
      callRoute(currentlocation, centerLokasi,'lightblue',markerku,selectedValue);
       B4A.CallSub('ChangeTravelMode_Listener', true, selectedValue);
  });
}


function loadMap(lat,lng){
  currentlat = lat;
  currentlng = lng;
  var centerBaru = new google.maps.LatLng({lat:lat,lng:lng});
  map = new google.maps.Map(document.getElementById('map'), {
    // mapTypeControlOptions: {
    //   mapTypeIds: ['mystyle', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN],
    //   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    // },
    center: new google.maps.LatLng(-0.323489, 100.349190),
    zoom: 14,
    mapTypeId: 'mystyle',
    disableDefaultUI:true,
    zoomControl: true,
    scaleControl: true,
    rotateControl: true,
    streetViewControl: false,
    fullscreenControl: true
  });
  map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'Styled Map' }));
  var centerControlDiv = document.createElement('div');
  centerControlDiv.style.marginRight='50px';
  var centerControlDiv2 = document.createElement('div');
  var legenda = document.createElement('div');
  var myLayerDiv = document.createElement('div');
  var refreshDiv = document.createElement('div');
  var dragDiv = document.createElement('div');
  var positionDiv = document.createElement('div');

  var centerControl = new CenterControl(centerControlDiv, map);
  var newControl = new MyMapControl(centerControlDiv2, map);
  var btnPosition= new MyPositionControl(positionDiv,map);
  var btnDrag= new MyDragMarker(dragDiv,map);
  var btnLegend = new MyButtonLegend(legenda,map);
  var btnLayer= new MyLayerControl(myLayerDiv,map);
  var btnRefresh= new MyButtonRefresh(refreshDiv,map);

  MyLegend();
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv2);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(positionDiv);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(dragDiv);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(legenda);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(myLayerDiv);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(refreshDiv);


  setMarkerPosition(lat,lng,'Current Position');
  //DraggerListerner();
}

function MyButtonRefresh(refreshDiv,map){
  var controlRefresh=document.createElement('button');
  controlRefresh.innerHTML='<i class="fas fa-sync" style="color:black;"></i>';
  controlRefresh.style.backgroundColor = '#fff';
  controlRefresh.style.border = '2px solid #fff';
  controlRefresh.style.borderRadius = '3px';
  controlRefresh.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlRefresh.style.cursor = 'pointer';
  controlRefresh.style.marginLeft = '10px';
  controlRefresh.style.marginTop='10px';
  controlRefresh.style.marginRight='10px';
  controlRefresh.style.padding = '5px';
  controlRefresh.style.height='auto';
  controlRefresh.style.color='black';
  controlRefresh.style.fontSize='13px';
  controlRefresh.style.textAlign = 'center';
  refreshDiv.append(controlRefresh);

  controlRefresh.addEventListener('click', function() {
    console.log('refresh');
    // loadMap(currentlat,currentlng);
    // setLayerAll();
    B4A.CallSub('refreshMap', true);
  });
}

function MyDragMarker(dragDiv,map){
  var controlMarker=document.createElement('button');
  controlMarker.innerHTML='<i class="fas fa-map-marked-alt" style="color:black;"></i>';
  controlMarker.style.backgroundColor = '#fff';
  controlMarker.style.border = '2px solid #fff';
  controlMarker.style.borderRadius = '3px';
  controlMarker.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlMarker.style.cursor = 'pointer';
  controlMarker.style.marginLeft = '10px';
  controlMarker.style.marginTop='10px';
  controlMarker.style.marginRight='10px';
  controlMarker.style.padding = '5px';
  controlMarker.style.height='auto';
  controlMarker.style.color='black';
  controlMarker.style.fontSize='13px';
  controlMarker.style.textAlign = 'center';
  dragDiv.append(controlMarker);

  controlMarker.addEventListener('click', function() {
    markerposition.setMap(null);
    setMarkerPosition(-0.323489,100.349190, 'Drag Me!');
    map.setCenter(new google.maps.LatLng(-0.323489,100.349190));
    B4A.CallSub('DragMarkerForRoute', true);
    DraggerListerner();
  });
}

function MyPositionControl(positionDiv,map){
  var controlPosition=document.createElement('button');
  controlPosition.innerHTML='<i class="fas fa-map-marker-alt" style="color:black;"></i>';
  controlPosition.style.backgroundColor = '#fff';
  controlPosition.style.border = '2px solid #fff';
  controlPosition.style.borderRadius = '3px';
  controlPosition.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlPosition.style.cursor = 'pointer';
  controlPosition.style.marginLeft = '10px';
  controlPosition.style.marginTop='10px';
  controlPosition.style.marginRight='10px';
  controlPosition.style.padding = '5px';
  controlPosition.style.height='auto';
  controlPosition.style.color='black';
  controlPosition.style.fontSize='13px';
  controlPosition.style.textAlign = 'center';
  positionDiv.append(controlPosition);

  controlPosition.addEventListener('click', function() {
    B4A.CallSub('MyLocation', true);
    // markerposition.setMap(null);
    // setMarkerPosition(-0.323489,100.349190);
  });
}

function MyLayerControl(layerDiv,map){
  var controlLayer=document.createElement('button');
  controlLayer.innerHTML='<i class="fas fa-layer-group" style="color:black;"></i>';
  controlLayer.setAttribute("type","button");
  controlLayer.setAttribute("id","hideLegend");
  controlLayer.setAttribute("data-toggle","modal");
  controlLayer.setAttribute("data-target","#myLayerModal");
  controlLayer.style.backgroundColor = '#fff';
  controlLayer.style.border = '2px solid #fff';
  controlLayer.style.borderRadius = '3px';
  controlLayer.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlLayer.style.cursor = 'pointer';
  controlLayer.style.marginLeft = '10px';
  controlLayer.style.marginTop='10px';
  controlLayer.style.marginRight='10px';
  controlLayer.style.padding = '5px';
  controlLayer.style.height='auto';
  controlLayer.style.color='black';
  controlLayer.style.fontSize='13px';
  controlLayer.style.textAlign = 'center';
  layerDiv.append(controlLayer);

  // controlLayer.addEventListener('click', function() {
  //   markerposition.setMap(null);
  //   setMarkerPosition(-0.323489,100.349190);
  // });
}

function refreshFromApp(lat,lng){
  loadMap(lat,lng);
  setLayerAll();
}

function MyButtonLegend(legend,map){
  var controlLegend=document.createElement('button');
  controlLegend.innerHTML='<i class="fa fa-globe" style="color:black;"></i>';

  controlLegend.setAttribute("type","button");
  controlLegend.setAttribute("id","hideLegend");
  controlLegend.setAttribute("data-toggle","modal");
  controlLegend.setAttribute("data-target","#myModal");
  controlLegend.style.backgroundColor = '#fff';
  controlLegend.style.border = '2px solid #fff';
  controlLegend.style.borderRadius = '3px';
  controlLegend.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlLegend.style.cursor = 'pointer';
  controlLegend.style.marginLeft = '10px';
  controlLegend.style.marginTop='10px';
  controlLegend.style.marginRight='10px';
  controlLegend.style.padding = '5px';
  controlLegend.style.height='auto';
  controlLegend.style.color='black';
  controlLegend.style.fontSize='13px';
  controlLegend.style.textAlign = 'center';
  legend.append(controlLegend);
}


function setMarkerPosition(lat,lng,contentx){
  var centerBaru = new google.maps.LatLng({lat:lat,lng:lng});
  markerposition = new google.maps.Marker({
    position: centerBaru,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true
  });
  infowindow = new google.maps.InfoWindow({
    position: {lat:lat,lng:lng},
    disableAutoPan: true,
    content: "<a style='color:black;'>"+contentx+"</a> "
  });
  infowindow.open(map, markerposition);
  console.log("-----------------"+lat);

}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarker(){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function callRoute(start, end, color, endmarker, mode) {
  console.log(mode);
  var rendererOptions = {
    suppressMarkers : false,
    markerOptions:{ //ganti icon marker destination
      icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 5,
      fillColor: '#1a73e8',
      strokeColor: '#1a73e8',
      fillOpacity: 0.8,
      strokeWeight: 1
    }
    },
    polylineOptions: { //ganti warna rute
      strokeColor: color,
      strokeWeight: 5,
      zIndex: 11
    }
  }
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    directionsService.route({
        origin: start,
        destination: end,
        travelMode: mode
      },
      function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          console.log( response.geocoded_waypoints);
          var _route = response.routes[0].legs[0];

          var distance = response.routes[0].legs[0].distance.value;
          console.log(distance+" meter");
          var km = distance/ 1000;
          console.log(km.toFixed(1) + " km");
          if (endmarker.info) {
                  endmarker.info.close();
          }
          endmarker.info = new google.maps.InfoWindow({
            content: '<center><a>Destination<br>'+km.toFixed(1) + " km"+'</a></center>',
            pixelOffset: new google.maps.Size(0, -1)
              });
          endmarker.info.open(map, endmarker);
        } else {
          B4A.CallSub('RouteMessage', true, 'Direction request returned no results.');
        }
      }
    );
        directionsDisplay.setMap(map);
        map.setZoom(16);
}

function callRouteNavigation(start, end, img_url, mode) {
  $('#directionsPanel').empty();
  var rendererOptions = {
    suppressMarkers : true
    }
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    directionsService.route({
        origin: start,
        destination: end,
        travelMode: mode
      },
      function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          console.log( response.geocoded_waypoints);
          var _route = response.routes[0].legs[0];

          var distance = response.routes[0].legs[0].distance.value;
          console.log(distance+" meter");
          var km = distance/ 1000;
          console.log(km.toFixed(1) + " km");
          // directionsDisplay.setPanel(document.getElementById("directionsPanel"));
            // directionsDisplay.setPanel(document.getElementById("directionsPanel"));
            console.log("Routes: "+ response.routes[0].legs);
            console.log(response.routes[0].legs);
            console.log(response.routes[0].legs[0].steps);
            var steps = response.routes[0].legs[0].steps;

            var container = document.getElementById("directionsPanel");

            var tableDirection = $('#directionsPanel').html('<table id="directionsTable" style="border-spacing: 0px;"></table>');
            $('#directionsTable').append('<tr class="routes-table"><td><center><img src="icons/marker.png" height="40"></center></td><td colspan="3">'+response.routes[0].legs[0].start_address+'</td></tr>');
            for (var i = 0; i < steps.length; i++) {
              console.log("test");
              var data;
              if (steps[i].maneuver != "") {
                console.log();
                var htppstatus = imageExists('icons/'+steps[i].maneuver+'.svg');
                if (htppstatus == 200) {
                    data = '<img src="icons/'+steps[i].maneuver+'.svg">';
                }else{
                  data = '';
                }

              }else{
                  data = '';
              }
              var no = i+1;
              $('#directionsTable').append('<tr><td>'+data+'</td><td>'+no+'.</td><td>'+steps[i].instructions+'</td><td style="width:30%;text-align:center">'+steps[i].distance.text+'</td></tr>');
              //steps[i]
            }
            $('#directionsTable').append('<tr class="routes-table"><td><img src="'+img_url+'" height="40"><td colspan="3">'+response.routes[0].legs[0].end_address+'</td></tr>');

            var step =Math.floor(response.routes[0].legs[0].steps.length / 2);
            var infowindow2 = new google.maps.InfoWindow();
            infowindow2.setContent(response.routes[0].legs[0].steps[step].distance.text + "<br>" + response.routes[0].legs[0].steps[step].duration.text + " ");
            infowindow2.setPosition(response.routes[0].legs[0].steps[step].end_location);
            infowindow2.open(map);
            container.style.height = 'auto';
            var contentHeight = document.getElementById('directionsPanel').offsetHeight;
            console.log("HEIGHTT :"+contentHeight);
            B4A.CallSub('DirectionHeight', true, contentHeight);

        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
}


function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();
    console.log(http.status);
    return http.status;

}


function LoadGeoBangunan(namelayer,color,url,index, status){

  var layername = new google.maps.Data();
  layername.setStyle({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 1,
            fillOpacity: 0.8,
            zIndex:index,
   });
  layername.loadGeoJson(url,null,function(features){
       features.forEach(function(feature) {
         var id = feature.getProperty('id');
        });
   });

   layername.addListener('click', function(event) {
     console.log(event);
       var id =event.feature.getProperty('id');
       var nama = event.feature.getProperty('nama');
       infowindow = new google.maps.InfoWindow({
          content: "<a style='color:black;'>"+id+"<br>"+nama+"</a> ",
          pixelOffset: new google.maps.Size(0, -33)
        });
        infowindow.setPosition(event.latLng);
       infowindow.open(map);
    });

    layername.setMap(map);
    switch (namelayer) {
      case 'batasnagari':
            batasnagari=layername;
        break;
      case 'houselayer':
            houselayer=layername;
        break;
      case 'msmelayer':
            msmelayer=layername;
        break;
      case 'educationlayer':
            educationlayer=layername;
        break;
      case 'officelayer':
            officelayer=layername;
        break;
      case 'healthlayer':
            healthlayer=layername;
        break;
      case 'worshiplayer':
            worshiplayer=layername;
        break;
      default:

    }


}


async function setLayerJorong(){

var url = server+'mobile/jorong.php';
  console.log(url);
  $.ajax({url: url, data: "", dataType: 'json', success: function(arrays){
    for (i = 0; i < arrays.features.length; i++) {
        var data = arrays.features[i];
        var arrayGeometries = data.geometry.coordinates;
        var jenis = data.jenis;
        var p2 = data.properties.nama;
        var p3 = 'Jorong: ' + p2;

        var idTitik = 0;
        var hitungTitik = [];
        while (idTitik < arrayGeometries[0][0].length) {
          var aa = arrayGeometries[0][0][idTitik][0];
          var bb = arrayGeometries[0][0][idTitik][1];
          hitungTitik[idTitik] = {
            lat: bb,
            lng: aa
          };
          idTitik += 1;
        }
        var stroke;
        if (data.properties.id == "KG") {
          var warna = '#F6F6C3';
          stroke ="yellow";
        } else if (data.properties.id == "GT") {
          var warna = '#C2DBC0';
          stroke ="lightgreen";
        } else if (data.properties.id == "SJ") {
          var warna = '#D0DEF5';
          stroke ="#4285f4";
        }

        digitjorong[njorong]= new google.maps.Polygon({
         paths: hitungTitik,
         strokeColor:stroke,
         strokeOpacity: 0.6,
         strokeWeight: 1.5,
         fillColor: warna,
         fillOpacity: 0.5,
         zIndex: 1,
         clickable: false
       });
       digitjorong[njorong].setMap(map);
       njorong = njorong + 1;
      }//end for
  }});//end ajax



  console.log("END JORONG");
}

function LoadGeoJorong(layername,url){
var warna;
var njorong = 0;
layername = new google.maps.Data();
layername.loadGeoJson(url,null,function(features){
 console.log("heii");
 console.log(features.length);


 features.forEach(function(feature){
   console.log(feature.getGeometry().getType());
   console.log(feature.getGeometry());
   var tesaja = feature.getGeometry('coordinates').getArray();
   console.log(tesaja[0].getArray());
   var object = tesaja[0].getArray();
   for (var variable in object) {
     if (object.hasOwnProperty(variable)) {
       var value = object[variable];
       console.log(value);
       console.log(value.getArray());
       valuetwo =value.getArray();
     }
   }
   //console.log(teslagi.[0].getArray());
      feature.forEachProperty(function(value,property) {
        console.log(property,':',value);
        if (value == "KG") {
          var warna = 'yellow';

        } else if (value == "GT") {
          var warna = 'green';

        } else if (value == "SJ") {
          var warna = '#478dff';
        }
      });
  });
});
layername.setMap(map);

}

function MarkerInfo(marker, info){
  marker.info = new google.maps.InfoWindow({
        content: '<center><a>'+info+'!</a></center>',
        pixelOffset: new google.maps.Size(0, -1)
          });
  marker.info.open(map, marker)
}

function CloseLegend(){
  document.getElementById("legend").style.display= 'none';
  legendstatus = false;
  B4A.CallSub('Legend_Status', true, legendstatus)
}

function setLayerAll(){
   //  LoadGeoBangunan('batasnagari','red',server+'mobile/batasnagari.php',2);
  // digitasijorong();
   viewdigitnagari();
   setLayerJorong();
   digitasirumah();
   digitasiumkm();
   digitasikantor();
   digitasit4ibadah();
   digitasipendidikan();
   digitasikesehatan();

   //  LoadGeoBangunan('houselayer','#CE9077',server+'mobile/datarumah.php',5);
   // LoadGeoBangunan('msmelayer','#B66C9C',server+'mobile/dataumkm.php', 6);
   //  LoadGeoBangunan('educationlayer','gray',server+'mobile/datapendidikan.php',7);
    // LoadGeoBangunan('officelayer','#7B7BA7',server+'mobile/datakantor.php',8);
    // LoadGeoBangunan('healthlayer','#FB7B62',server+'mobile/datakesehatan.php',9);
    // LoadGeoBangunan('worshiplayer','#7BBB62',server+'mobile/datat4ibadah.php',10);

}

function showLayerJorong(stat){
  if (stat == true) {

  }else {

  }
}

function checkLayer(){
  $('#allLayer').click(function(){
      if($('#allLayer').prop("checked") == true){
        $('input[type="checkbox"]').prop("checked",true);
      }
      else if($('#allLayer').prop("checked") == false){
        $('input[type="checkbox"]').prop("checked",false);
      }
      $('#nagari-layer').change();
      $('#jorong-layer').change();
      $('#house-layer').change();
      $('#msme-layer').change();
      $('#education-layer').change();
      $('#office-layer').change();
      $('#health-layer').change();
      $('#worship-layer').change();
  });
}



function checkNagariLayer(){
  $('#nagari-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //'LoadGeoBangunan('batasnagari','red',server+'mobile/batasnagari.php',2,'show');
        //viewdigitnagari();
        batasnagari.setStyle(function (feature) {
          return {
            strokeWeight: ketebalan,
            strokeColor: warnanagari
          }
        });
      }
      else if($(this).prop("checked") == false){

        //batasnagari.setMap(null);
        batasnagari.setStyle(function (feature) {
          return {
            strokeWeight: 0
          }
        });
        $('#allLayer').prop("checked",false);
        $('#allLayer').change();
      }
      checkedAll();
  });
}

function checkJorongLayer(){
  $('#jorong-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //setLayerJorong();
        var n = 0;
        while (n < njorong) {
          digitjorong[n].setOptions({
            visible: true
          });
          n = n + 1;
        }
      }
      else if($(this).prop("checked") == false){
        // for (var i = 0; i < digitjorong.length; i++) {
        //   digitjorong[i].setMap(null);
        // }
        var n = 0;
        while (n < njorong) {
          digitjorong[n].setOptions({
            visible: false
          });
          n = n + 1;
        }
        $('#allLayer').prop("checked",false);
        $('#allLayer').change();
      }
checkedAll();
  });
}

function checkHouseLayer(){
  $('#house-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //digitasirumah();
        var n = 0;
        while (n < nrumah) {
          digitrumah[n].setOptions({
            visible: true
          });
          n = n + 1;
        }
      }
      else if($(this).prop("checked") == false){
        // for (var i = 0; i < digitrumah.length; i++) {
        //   digitrumah[i].setMap(null);
        // }
        var n = 0;
        while (n < nrumah) {
          digitrumah[n].setOptions({
            visible: false
          });
          n = n + 1;
        }
        $('#allLayer').prop("checked",false);
        $('#allLayer').change();
      }
      checkedAll();
  });
}

function checkMsmeLayer(){
  $('#msme-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //digitasiumkm();
        var n = 0;
        while (n < numkm) {
          digitumkm[n].setOptions({
            visible: true
          });
          n = n + 1;
        }
      }
      else if($(this).prop("checked") == false){
      //  msmelayer.setMap(null);
      var n = 0;
      while (n < numkm) {
        digitumkm[n].setOptions({
          visible: false
        });
        n = n + 1;
      }
      $('#allLayer').prop("checked",false);
      $('#allLayer').change();
      }
      checkedAll();
  });
}

function checkEducationLayer(){
  $('#education-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //digitasipendidikan();
        var n = 0;
        while (n < npendidikan) {
          digitpendidikan[n].setOptions({
            visible: true
          });
          n = n + 1;
        }
      }
      else if($(this).prop("checked") == false){
        //educationlayer.setMap(null);
        var n = 0;
        while (n < npendidikan) {
          digitpendidikan[n].setOptions({
            visible: false
          });
          n = n + 1;
        }
        $('#allLayer').prop("checked",false);
        $('#allLayer').change();
      }
      checkedAll();
  });
}

function checkOfficeLayer(){
  $('#office-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //digitasikantor();
        var n = 0;
        while (n < nkantor) {
          digitkantor[n].setOptions({
            visible: true
          });
          n = n + 1;
        }
      }
      else if($(this).prop("checked") == false){
        //officelayer.setMap(null);
        var n = 0;
        while (n < nkantor) {
          digitkantor[n].setOptions({
            visible: false
          });
          n = n + 1;
        }
        $('#allLayer').prop("checked",false);
        $('#allLayer').change();
      }
      checkedAll();
  });
}

function checkHealthLayer(){
  $('#health-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //digitasikesehatan();
        var n = 0;
        while (n < nkesehatan) {
          digitkesehatan[n].setOptions({
            visible: true
          });
          n = n + 1;
        }
      }
      else if($(this).prop("checked") == false){
        //healthlayer.setMap(null);
        var n = 0;
        while (n < nkesehatan) {
          digitkesehatan[n].setOptions({
            visible: false
          });
          n = n + 1;
        }
        $('#allLayer').prop("checked",false);
        $('#allLayer').change();
      }
      checkedAll();
  });
}

function checkWorshipLayer(){
  $('#worship-layer').change(function(){
      if($(this).prop("checked") == true){
        console.log("checked");
        //digitasit4ibadah();
        var n = 0;
        while (n < nibadah) {
          digitibadah[n].setOptions({
            visible: true
          });
          n = n + 1;
        }
      }
      else if($(this).prop("checked") == false){
        //worshiplayer.setMap(null);
        var n = 0;
        while (n < nibadah) {
          digitibadah[n].setOptions({
            visible: false
          });
          n = n + 1;
        }
        $('#allLayer').prop("checked",false);
        $('#allLayer').change();
      }

      checkedAll();
  });
}

function checkedAll(){
  if ( ($('#worship-layer').prop("checked") == true) && ($('#health-layer').prop("checked") == true) && ($('#office-layer').prop("checked") == true) && ($('#education-layer').prop("checked") == true) && ($('#house-layer').prop("checked") == true) && ($('#msme-layer').prop("checked") == true) && ($('#nagari-layer').prop("checked") == true) && ($('#jorong-layer').prop("checked") == true)) {
    $('#allLayer').prop("checked",true);

  }
}

function showDataSearch(rows, markericon){

  for (var i in rows){
    var row = rows[i];
    var id = row.id;

    centerBaru = new google.maps.LatLng({lat: parseFloat(row.latitude), lng:  parseFloat(row.longitude)});

    //markerposition.setMap(null);
    var marker = new google.maps.Marker({
      position: centerBaru,
      center:centerBaru,
      map: map,
      title: row.name,
      icon:{ url: ""+server+"/img/"+markericon+""},
      animation: google.maps.Animation.DROP
     });
     markers.push(marker);
     map.setCenter(centerBaru);
     map.setZoom(14);

  }//end for


}

function showRadius(lat,lng, rad){
  hapusRadius();
  var latlng = new google.maps.LatLng(lat, lng);
  var circle = new google.maps.Circle({
    center: latlng,
    radius: rad,
    map:map,
    strokeColor: "blue",
    strokeOpacity: 0.5,
    strokeWeight: 1,
    fillColor: "blue",
    fillOpacity: 0.35
  });
  map.setZoom(15);
  map.setCenter(latlng);
  circles.push(circle);
}

function hapusRadius() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].setMap(null);
  }
  circles = [];
}

function digitasirumah() {
  // houselayer = new google.maps.Data();
  // $.ajax({
  //   url: server+'mobile/datarumah.php',
  //   dataType: 'json',
  //   cache: false,
  //   success: function (arrays) {
  //     var data = arrays.features[0];
  //     var arrayGeometries = data.geometry.coordinates;
  //     houselayer.addGeoJson(arrays);
  //     houselayer.setStyle(function (feature) {
  //       return ({
  //         strokeColor: 'yellow',
  //        strokeOpacity: 2,
  //        strokeWeight: 0.5,
  //        //fillColor: '#B22222',
  //        fillColor: 'brown',
  //        fillOpacity: 0.5,
  //        zIndex: 5,
  //       });
  //     });
  //     houselayer.setMap(map);
  //   }
  // });
  $.ajax({
    url: server+'mobile/datarumah.php',
    dataType: 'json',
    cache: false,
    success: function (arrays) {
      console.log(arrays);
      for (i = 0; i < arrays.features.length; i++) {
        var data = arrays.features[i];
        var arrayGeometries = data.geometry.coordinates;
        var jenis = data.jenis;
        var link = "<button class='btn btn-info btn-xs fa fa-info-circle' title='View Details' onclick='detailrumah("+'"'+data.properties.id+'"'+")'></button>";
        var p1 = ' ID: ' + data.properties.id;
        var p2 = '<p>' + data.properties.nama + '</p>';
        var p3 = link + p1 + p2 +'('+jenis+') ';

        var idTitik = 0;
        var hitungTitik = [];
        while (idTitik < arrayGeometries[0][0].length) {
          var aa = arrayGeometries[0][0][idTitik][0];
          var bb = arrayGeometries[0][0][idTitik][1];
          hitungTitik[idTitik] = {
            lat: bb,
            lng: aa
          };
          idTitik += 1;
        }

        digitrumah[nrumah] = new google.maps.Polygon({
          paths: hitungTitik,
          strokeColor: 'yellow',
          strokeOpacity: 2,
          strokeWeight: 0.5,
          //fillColor: '#B22222',
          fillColor: 'brown',
          fillOpacity: 0.5,
          zIndex: 5,
          content: p3
        });
        digitrumah[nrumah].setMap(map);
        digitrumah[nrumah].addListener('click', function (event) {
          var lat = event.latLng.lat();
          var lng = event.latLng.lng();
          var info = {
            lat: lat,
            lng: lng
          };
          infoWindow.setContent(this.content);
          infoWindow.setPosition(info);
          infoWindow.open(map);
        });
        nrumah = nrumah + 1;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // $('#gagal').modal('show');
      // $('#notifikasi').empty();$('#notifikasi').append(xhr.status);
      // $('#notifikasi').append(thrownError);
    }
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
}

function digitasiumkm() {
  $.ajax({
    url: server+'mobile/dataumkm.php',
    dataType: 'json',
    cache: false,
    success: function (arrays) {
      for (i = 0; i < arrays.features.length; i++) {
        var data = arrays.features[i];
        var arrayGeometries = data.geometry.coordinates;
        var jenis = data.jenis;
        var link = "<button class='btn btn-info btn-xs fa fa-info-circle' title='View Details' onclick='detailumkm("+'"'+data.properties.id+'"'+")'></button>";
        var p1 = ' ID: ' + data.properties.id;
        var p2 = '<p>' + data.properties.nama + '</p>';
        var p3 = link + p1 + p2 +'('+jenis+') ';

        var idTitik = 0;
        var hitungTitik = [];
        while (idTitik < arrayGeometries[0][0].length) {
          var aa = arrayGeometries[0][0][idTitik][0];
          var bb = arrayGeometries[0][0][idTitik][1];
          hitungTitik[idTitik] = {
            lat: bb,
            lng: aa
          };
          idTitik += 1;
        }

        digitumkm[numkm] = new google.maps.Polygon({
          paths: hitungTitik,
          strokeColor: 'yellow',
          strokeOpacity: 1,
          strokeWeight: 0.5,
          fillColor: '#8A2BE2',
          fillOpacity: 0.35,
          zIndex: 6,
          content: p3
        });
        digitumkm[numkm].setMap(map);
        digitumkm[numkm].addListener('click', function (event) {
          var lat = event.latLng.lat();
          var lng = event.latLng.lng();
          var info = {
            lat: lat,
            lng: lng
          };
          infoWindow.setContent(this.content);
          infoWindow.setPosition(info);
          infoWindow.open(map);
        });
        numkm = numkm + 1;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // $('#gagal').modal('show');
      // $('#notifikasi').empty();$('#notifikasi').append(xhr.status);
      // $('#notifikasi').append(thrownError);
    }
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
}

function digitasit4ibadah() {
  $.ajax({
    url: server+'mobile/datat4ibadah.php',
    dataType: 'json',
    cache: false,
    success: function (arrays) {
      for (i = 0; i < arrays.features.length; i++) {
        var data = arrays.features[i];
        var arrayGeometries = data.geometry.coordinates;
        var jenis = data.jenis;
        var jenis = data.jenis;
        var link = "<button class='btn btn-info btn-xs fa fa-info-circle' title='View Details' onclick='detailibadah("+'"'+data.properties.id+'"'+")'></button>";
        var p1 = ' ID: ' + data.properties.id;
        var p2 = '<p>' + data.properties.nama + '</p>';
        var p3 = link + p1 + p2 +'('+jenis+') ';

        var idTitik = 0;
        var hitungTitik = [];
        while (idTitik < arrayGeometries[0][0].length) {
          var aa = arrayGeometries[0][0][idTitik][0];
          var bb = arrayGeometries[0][0][idTitik][1];
          hitungTitik[idTitik] = {
            lat: bb,
            lng: aa
          };
          idTitik += 1;
        }

        digitibadah[nibadah] = new google.maps.Polygon({
          paths: hitungTitik,
          strokeColor: 'orange',
          strokeOpacity: 1,
          strokeWeight: 0.5,
          fillColor: 'green',
          fillOpacity: 0.5,
          zIndex: 10,
          content: p3
        });
        digitibadah[nibadah].setMap(map);
        digitibadah[nibadah].addListener('click', function (event) {
          var lat = event.latLng.lat();
          var lng = event.latLng.lng();
          var info = {
            lat: lat,
            lng: lng
          };
          infoWindow.setContent(this.content);
          infoWindow.setPosition(info);
          infoWindow.open(map);
        });
        nibadah = nibadah + 1;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // $('#gagal').modal('show');
      // $('#notifikasi').empty();$('#notifikasi').append(xhr.status);
      // $('#notifikasi').append(thrownError);
    }
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
}

function digitasikantor() {
  $.ajax({
    url: server+'mobile/datakantor.php',
    dataType: 'json',
    cache: false,
    success: function (arrays) {
      for (i = 0; i < arrays.features.length; i++) {
        var data = arrays.features[i];
        var arrayGeometries = data.geometry.coordinates;
        var jenis = data.jenis;
        var link = "<button class='btn btn-info btn-xs fa fa-info-circle' title='View Details' onclick='detailkantor("+'"'+data.properties.id+'"'+")'></button>";
        var p1 = ' ID: ' + data.properties.id;
        var p2 = '<p>' + data.properties.nama + '</p>';
        var p3 = link + p1 + p2 +'('+jenis+') ';

        var idTitik = 0;
        var hitungTitik = [];
        while (idTitik < arrayGeometries[0][0].length) {
          var aa = arrayGeometries[0][0][idTitik][0];
          var bb = arrayGeometries[0][0][idTitik][1];
          hitungTitik[idTitik] = {
            lat: bb,
            lng: aa
          };
          idTitik += 1;
        }

        digitkantor[nkantor] = new google.maps.Polygon({
          paths: hitungTitik,
          strokeColor: 'orange',
          strokeOpacity: 1,
          strokeWeight: 0.5,
          fillColor: 'darkblue',
          fillOpacity: 0.5,
          zIndex: 8,
          content: p3
        });
        digitkantor[nkantor].setMap(map);
        digitkantor[nkantor].addListener('click', function (event) {
          var lat = event.latLng.lat();
          var lng = event.latLng.lng();
          var info = {
            lat: lat,
            lng: lng
          };
          infoWindow.setContent(this.content);
          infoWindow.setPosition(info);
          infoWindow.open(map);
        });
        nkantor = nkantor + 1;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // $('#gagal').modal('show');
      // $('#notifikasi').empty();$('#notifikasi').append(xhr.status);
      // $('#notifikasi').append(thrownError);
    }
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
}

function digitasipendidikan() {
  $.ajax({
    url: server+'mobile/datapendidikan.php',
    dataType: 'json',
    cache: false,
    success: function (arrays) {
      for (i = 0; i < arrays.features.length; i++) {
        var data = arrays.features[i];
        var arrayGeometries = data.geometry.coordinates;
        var jenis = data.jenis;
        var link = "<button class='btn btn-info btn-xs fa fa-info-circle' title='View Details' onclick='detailpendidikan("+'"'+data.properties.id+'"'+")'></button>";
        var p1 = ' ID: ' + data.properties.id;
        var p2 = '<p>' + data.properties.nama + '</p>';
        var p3 = link + p1 + p2 +'('+jenis+') ';

        var idTitik = 0;
        var hitungTitik = [];
        while (idTitik < arrayGeometries[0][0].length) {
          var aa = arrayGeometries[0][0][idTitik][0];
          var bb = arrayGeometries[0][0][idTitik][1];
          hitungTitik[idTitik] = {
            lat: bb,
            lng: aa
          };
          idTitik += 1;
        }

        digitpendidikan[npendidikan] = new google.maps.Polygon({
          paths: hitungTitik,
          strokeColor: 'black',
          strokeOpacity: 1,
          strokeWeight: 0.5,
          fillColor: 'black',
          fillOpacity: 0.7,
          zIndex: 7,
          content: p3
        });
        digitpendidikan[npendidikan].setMap(map);
        digitpendidikan[npendidikan].addListener('click', function (event) {
          var lat = event.latLng.lat();
          var lng = event.latLng.lng();
          var info = {
            lat: lat,
            lng: lng
          };
          infoWindow.setContent(this.content);
          infoWindow.setPosition(info);
          infoWindow.open(map);
        });
        npendidikan = npendidikan + 1;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // $('#gagal').modal('show');
      // $('#notifikasi').empty();$('#notifikasi').append(xhr.status);
      // $('#notifikasi').append(thrownError);
    }
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
}

function digitasikesehatan() {
  $.ajax({
    url: server+'mobile/datakesehatan.php',
    dataType: 'json',
    cache: false,
    success: function (arrays) {
      for (i = 0; i < arrays.features.length; i++) {
        var data = arrays.features[i];
        var arrayGeometries = data.geometry.coordinates;
        var jenis = data.jenis;
        var link = "<button class='btn btn-info btn-xs fa fa-info-circle' title='View Details' onclick='detailkesehatan("+'"'+data.properties.id+'"'+")'></button>";
        var p1 = ' ID: ' + data.properties.id;
        var p2 = '<p>' + data.properties.nama + '</p>';
        var p3 = link + p1 + p2 +'('+jenis+') ';

        var idTitik = 0;
        var hitungTitik = [];
        while (idTitik < arrayGeometries[0][0].length) {
          var aa = arrayGeometries[0][0][idTitik][0];
          var bb = arrayGeometries[0][0][idTitik][1];
          hitungTitik[idTitik] = {
            lat: bb,
            lng: aa
          };
          idTitik += 1;
        }

        digitkesehatan[nkesehatan] = new google.maps.Polygon({
          paths: hitungTitik,
          strokeColor: 'red',
          strokeOpacity: 1,
          strokeWeight: 0.5,
          fillColor: 'red',
          fillOpacity: 0.5,
          zIndex: 9,
          content: p3
        });
        digitkesehatan[nkesehatan].setMap(map);
        digitkesehatan[nkesehatan].addListener('click', function (event) {
          var lat = event.latLng.lat();
          var lng = event.latLng.lng();
          var info = {
            lat: lat,
            lng: lng
          };
          infoWindow.setContent(this.content);
          infoWindow.setPosition(info);
          infoWindow.open(map);
        });
        nkesehatan = nkesehatan + 1;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // $('#gagal').modal('show');
      // $('#notifikasi').empty();$('#notifikasi').append(xhr.status);
      // $('#notifikasi').append(thrownError);
    }
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
}

function viewdigitnagari() {
  batasnagari = new google.maps.Data();
  // batasnagari.loadGeoJson(url,null,function(features){
  //      features.forEach(function(feature) {
  //        var id = feature.getProperty('id');
  //       });
  //  });

  // batasnagari.addGeoJson(server+'mobile/batasnagari.php');
  // batasnagari.setStyle(function (feature) {
  //   return ({
  //     strokeWeight: ketebalan,
  //     strokeColor: warnanagari,
  //     clickable: false,
  //     zIndex: 2,
  //   });
  // });
  // batasnagari.setMap(map);

  $.ajax({
    url: server+'mobile/batasnagari.php',
    dataType: 'json',
    cache: false,
    success: function (arrays) {
      console.log(arrays);
      var data = arrays.features[0];
      var arrayGeometries = data.geometry.coordinates;
      batasnagari.addGeoJson(arrays);
      batasnagari.setStyle(function (feature) {
        return ({
          strokeWeight: ketebalan,
          strokeColor: warnanagari,
          clickable: false,
          zIndex: 2,
        });
      });
      batasnagari.setMap(map);
    }
  });

}

function carimodel(model,building){
  clearMarker();
  hapusRadius();
  console.log(model);
  console.log(building);
  var buildings = building.split(',');
  var urlhouse = server+'act/rumah_cari-model.php?model='+model+'';
  var urlworship = server+'act/ibadah_cari-model.php?model='+model+'';
  var urlmsme = server+'act/umkm_cari-model.php?model='+model+'';
  var urleducation = server+'act/pendidikan_cari-model.php?model='+model+'';
  var urlhealth =server+'act/kesehatan_cari-model.php?model='+model+'';
  var urloffice = server+'act/kantor_cari-model.php?model='+model+'';

  buildings.forEach(function(value){
    console.log(value);
    switch (value) {
      case 'house':
      $.ajax({url: urlhouse, data: "", dataType: 'json', success: function(rows){
        console.log(rows);
          showDataSearch(rows,"home.png");

      }});//end ajax
      break;
      case 'office':
      $.ajax({url: urloffice, data: "", dataType: 'json', success: function(rows){
        console.log(rows);
          showDataSearch(rows,"kantor.png");
      }});//end ajax
      break;
      case 'worship':
      $.ajax({url: urlworship, data: "", dataType: 'json', success: function(rows){
        console.log(rows);
          showDataSearch(rows,"musajik.png");
      }});//end ajax
      break;
      case 'msme':
      $.ajax({url: urlmsme, data: "", dataType: 'json', success: function(rows){
        console.log(rows);
          showDataSearch(rows,"kadai.png");
      }});//end ajax
      break;
      case 'health':
      $.ajax({url: urlhealth, data: "", dataType: 'json', success: function(rows){
        console.log(rows);
          showDataSearch(rows,"kesehatan.png");
      }});//end ajax
      break;
      case 'educational':
      $.ajax({url: urleducation, data: "", dataType: 'json', success: function(rows){
        console.log(rows);
          showDataSearch(rows,"sekolah.png");
      }});//end ajax
      break;
      default:

    }
  });
  setMapOnAll(map);
  DraggerListerner();

}
