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
if (isset($_GET['datuk'])) {
  $datuk = $_GET["datuk"];
	$querysearch = " 	SELECT H.house_building_id, ST_X(ST_Centroid(H.geom)) AS longitude, ST_Y(ST_CENTROID(H.geom)) AS latitude
						FROM house_building AS H
						JOIN family_card AS O ON H.house_building_id=O.house_building_id
						WHERE datuk_id = '$datuk' ORDER BY house_building_id
					";
	$hasil = pg_query($querysearch);
	while ($row = pg_fetch_array($hasil)) {
	    $id = $row['house_building_id'];
	    $longitude = $row['longitude'];
	    $latitude = $row['latitude'];
	    $dataarray[] = array('id' => $id, 'longitude' => $longitude, 'latitude' => $latitude);
	}
	// echo json_encode($dataarray);
}
 ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
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
        var a = <?php echo json_encode($dataarray); ?>;
        console.log(a);
        console.log(a.length);
        panjang=a.length;
        // var layernya = new google.maps.Data();
        //                    layernya.loadGeoJson(a);
        //                    layernya.setMap(map);
        console.log(a[0]['latitude']);
        for (i=0; i < panjang; i++) {
          var myLatLng = {lat: parseFloat(a[i]['latitude']), lng: parseFloat(a[i]['longitude'])};
          var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: 'Hello World!'
       });

       }
       var batasnagari, houselayer, msmelayer, educationlayer, officelayer,worshiplayer, healthlayer;

       LoadGeoBangunan(batasnagari,'red',server+'mobile/batasnagari.php');
       setLayerJorong();
       LoadGeoBangunan(houselayer,'#CE9077',server+'mobile/datarumah.php');
       LoadGeoBangunan(msmelayer,'#B66C9C',server+'mobile/dataumkm.php');
       LoadGeoBangunan(educationlayer,'gray',server+'mobile/datapendidikan.php');
       LoadGeoBangunan(officelayer,'#7B7BA7',server+'mobile/datakantor.php');
       LoadGeoBangunan(healthlayer,'#FB7B62',server+'mobile/datakesehatan.php');
       LoadGeoBangunan(worshiplayer,'#7BBB62',server+'mobile/datat4ibadah.php');
        }

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&callback=initMap"
    async defer></script>
  </body>
</html>
  </body>
</html>
