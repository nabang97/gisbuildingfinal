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
  					M.msme_building_id,
  					M.name_of_msme_building,
  					M.geom,
  					ST_X(ST_CENTROID(M.geom)) as longitude,
  					ST_Y(ST_CENTROID(M.geom)) as latitude
  					FROM msme_building AS M, jorong AS J
  					WHERE ST_CONTAINS(J.geom, M.geom) and J.jorong_id='$j_id'";

  $hasil = pg_query($querysearch);
  while ($row = pg_fetch_array($hasil)) {
      $id = $row['msme_building_id'];
      $name = $row['name_of_msme_building'];
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

!DOCTYPE html>
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
        showDataSearch(a,"kadai.png");
        DraggerListerner();
      }
    </script>
    <?php include('../resources/footer.php'); ?>
  </body>
</html>
