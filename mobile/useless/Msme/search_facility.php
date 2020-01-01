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
if (isset($_GET['facility'])) {
  // code...

  $fas=$_GET['facility'];
  $fas = explode(",", $fas);
  $f = "";
  $total = count($fas);
  for($i=0;$i<$total;$i++){
  	if($i == $total-1){
  		$f .= $fas[$i];
  	}else{
  		$f .= $fas[$i].",";
  	}
  }
  $querysearch="	SELECT M.msme_building_id, M.name_of_msme_building, ST_X(ST_Centroid(M.geom)) AS lng, ST_Y(ST_CENTROID(M.geom)) AS lat
  				FROM msme_building AS M
  				JOIN detail_msme_building_facilities AS F on M.msme_building_id=F.msme_building_id
  				WHERE F.facility_id IN ($f) GROUP BY F.msme_building_id, M.msme_building_id, M.name_of_msme_building
  				HAVING COUNT(*) = '$total'";
  $hasil=pg_query($querysearch);
  while($row = pg_fetch_array($hasil))
  	{
  		$id=$row['msme_building_id'];
  		$name=$row['name_of_msme_building'];
  		$longitude=$row['lng'];
  		$latitude=$row['lat'];
  		$dataarray[]=array(
  							'id'=>$id,
  							'name'=>$name,
  							'longitude'=>$longitude,
  							'latitude'=>$latitude
  						);
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
