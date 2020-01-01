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
if (isset($_GET["jorong"])) {
  // code...

  $j_id = $_GET["jorong"];

  $querysearch = " 	SELECT
  					W.educational_building_id,
  					W.name_of_educational_building,
  					W.geom,
  					ST_X(ST_CENTROID(W.geom)) as longitude,
  					ST_Y(ST_CENTROID(W.geom)) as latitude
  					FROM educational_building AS W, jorong AS J
  					WHERE ST_CONTAINS(J.geom, W.geom) and J.jorong_id='$j_id'";

  $hasil = pg_query($querysearch);
  while ($row = pg_fetch_array($hasil)) {
      $id = $row['educational_building_id'];
      $name = $row['name_of_educational_building'];
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
                var latitude =parseFloat(a[i]['latitude'])
                var longitude = parseFloat(a[i]['longitude']);
                var myLatLng = {lat: latitude, lng:longitude };
                 centerBaru = new google.maps.LatLng({lat:latitude, lng: longitude});
                var marker = new google.maps.Marker({
                   position: centerBaru,
                   center:centerBaru,
                   map: map,
                   title: a[i]['name'],
                   icon:{ url: ""+server+"/img/sekolah.png"  },
                   animation: google.maps.Animation.DROP
                  });
                  markers.push(marker);
                  //console.log(centerBaru);
                  map.setCenter(centerBaru);
                  map.setZoom(14);

             }
          }
          setMapOnAll(map);


        }

        }

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&callback=initMap"
    async defer></script>
    <script src="../js/jquery-3.4.0.min.js" charset="utf-8"></script>
    <script src="../js/script.js"></script>
  </body>
</html>
  </body>
</html>
