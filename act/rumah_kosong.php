
<?php
require '../inc/koneksi.php';

$cari_nama = $_GET["cari_nama"];
 

$querysearch	=" 	SELECT house_building_id, ST_X(ST_Centroid(geom)) AS longitude, ST_Y(ST_CENTROID(geom)) As latitude
					FROM house_building WHERE building_status=0;
				";
			   
$hasil=pg_query($querysearch);
while($row = pg_fetch_array($hasil))
    {
          $id=$row['house_building_id'];
          //$name=$row['name'];
          $longitude=$row['longitude'];
          $latitude=$row['latitude'];
          $dataarray[]=array('id'=>$id,'name'=>$name, 'longitude'=>$longitude,'latitude'=>$latitude);
    }
echo json_encode ($dataarray);
?>