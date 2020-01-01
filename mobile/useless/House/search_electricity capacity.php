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
if (isset($_GET['awal']) && isset($_GET['akhir'])) {
  $awal = $_GET["awal"];
  	$akhir = $_GET["akhir"];
  	$querysearch = " SELECT house_building_id, ST_X(ST_Centroid(geom)) AS longitude, ST_Y(ST_CENTROID(geom)) AS latitude
  						FROM house_building WHERE electricity_capacity BETWEEN '$awal' AND '$akhir' ORDER BY house_building_id
  					";
  	$hasil = pg_query($querysearch);
  	while ($row = pg_fetch_array($hasil)) {
  	    $id = $row['house_building_id'];
  	    $longitude = $row['longitude'];
  	    $latitude = $row['latitude'];
  	    $dataarray[] = array('id' => $id, 'longitude' => $longitude, 'latitude' => $latitude);
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
     <?php include('../resources/head.php'); ?>
   </head>
   <body>
     <div id="map"></div>
     <?php include('../resources/modal/legend_modal.php'); ?>
     <?php include('../resources/modal/layer_modal.php'); ?>
     <script>
       var map;
       var latposition = <?php echo $lat ?>;
       var lngposition = <?php echo $lng ?>;
       function initMap() {
         loadMap(latposition,lngposition);
         setLayerAll();
         var a = <?php echo $datajson; ?>;
         showDataSearch(a,"home.png");
       }
     </script>
     <?php include('../resources/footer.php'); ?>
   </body>
 </html>
