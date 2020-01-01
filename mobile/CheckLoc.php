<?php
if (isset($_GET['lat']) && $_GET['lng'] ) {
  if (($_GET['lat']=="") && ($_GET['lng']=="")){
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

 ?>
