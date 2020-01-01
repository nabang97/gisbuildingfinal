<?php
require '../mobile/koneksi.php';
if (isset($_GET['lat']) && $_GET['lng'] ) {
  if ((isset($_GET['lat'])=="") && (isset($_GET['lng'])=="")){
    $lat = -0.3209284;
    $lng = 100.3484996;
  }else{
    $lat = $_GET['lat'];
    $lng = $_GET['lng'];
  }
}else{
  $lat = -0.3209284;
  $lng = 100.3484996;
}
if (isset($_GET["construction"])) {
  // code...

  $type = $_GET["construction"];

  $querysearch = " 	SELECT health_building_id, name_of_health_building ,ST_X(ST_Centroid(geom)) AS longitude, ST_Y(ST_CENTROID(geom)) As latitude
  					FROM health_building
                      WHERE type_of_construction = '$type' order by name_of_health_building
  				";

  $hasil = pg_query($querysearch);
  while ($row = pg_fetch_array($hasil)) {
      $id = $row['health_building_id'];
      $name = $row['name_of_health_building'];
      $longitude = $row['longitude'];
      $latitude = $row['latitude'];
      $dataarray[] = array('id' => $id, 'name' => $name, 'longitude' => $longitude, 'latitude' => $latitude);
  }
  if (empty($dataarray)) {
    $datajson = 'null';
  }
  else {
      $datajson = json_encode ($dataarray);
  }
}
?>

    <!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <script src="../js/jquery-3.4.0.min.js" charset="utf-8"></script>
    <script src="../js/script.js"></script>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
    var map;
    var latposition = <?php echo $lat ?>;
    var lngposition = <?php echo $lng ?>;
    function initMap() {
      loadMap(latposition,lngposition);
      setLayerAll();

        var a = <?php echo $datajson; ?>;
        if (a == null) {
          console.log("DATA NGGAK ADA");
        }
        else {
          console.log(a);
          panjang=a.length;
          // var layernya = new google.maps.Data();
          //                    layernya.loadGeoJson(a);
          //                    layernya.setMap(map);
          if (panjang > 0) {
            console.log(a[0]['latitude']);
              for (i=0; i < panjang; i++) {
                var myLatLng = {lat: parseFloat(a[i]['latitude']), lng: parseFloat(a[i]['longitude'])};
                var marker = new google.maps.Marker({
                   position: myLatLng,
                   map: map,
                   title: a[i]['name'],
                   icon:{ url: ""+server+"/img/kesehatan.png" }
                  });

             }
          }
        }

        var markerposition = new google.maps.Marker({
           position: {lat: latposition, lng: lngposition},
           map: map,
           title: "Your Position",
           clickable : false
        });
        markerposition.info = new google.maps.InfoWindow({
         content: '<center><a>Your Position</a></center>',
         pixelOffset: new google.maps.Size(0, -1)
           });
       markerposition.info.open(map, markerposition)
        }

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&callback=initMap"
    async defer></script>
  </body>
</html>
