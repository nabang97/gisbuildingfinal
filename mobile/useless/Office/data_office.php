<?php
require 'mobile/koneksi.php';
header("access-control-allow-origin: *");
$querysearch = "SELECT office_building_id, name_of_office_building ,ST_X(ST_Centroid(geom)) AS longitude, ST_Y(ST_CENTROID(geom)) As latitude
          FROM office_building";

$hasil = pg_query($querysearch);
while ($row = pg_fetch_array($hasil)) {
    $id = $row['office_building_id'];
    $name = $row['name_of_office_building'];
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
?>
