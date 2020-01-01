<?php
require '../mobile/koneksi.php';

$fas=$_GET['fas'];
$fas = explode(",", $fas);
$f = "";
$total = count($fas);
for($i=0;$i<$total;$i++){
	if($i == $total-1){
		$f .= "'".$fas[$i]."'";
	}else{
		$f .= "'".$fas[$i]."',";
	}
}
$querysearch="	SELECT E.educational_building_id, E.name_of_educational_building, ST_X(ST_Centroid(E.geom)) AS lng, ST_Y(ST_CENTROID(E.geom)) AS lat FROM educational_building AS E	JOIN detail_educational_building_facilities AS F on E.educational_building_id=F.educational_building_id	WHERE F.facility_id IN ($f) GROUP BY F.educational_building_id, E.educational_building_id, E.name_of_educational_building	HAVING COUNT(*) = '$total'";
$hasil=pg_query($querysearch);
while($row = pg_fetch_array($hasil))
	{
		$id=$row['educational_building_id'];
		$name=$row['name_of_educational_building'];
		$longitude=$row['lng'];
		$latitude=$row['lat'];

		$dataarray[]=array('id'=>$id,'name'=>$name,'longitude'=>$longitude,'latitude'=>$latitude);
	}
echo json_encode ($dataarray);
?>
