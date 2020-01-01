<?php
if (isset($_GET["lat"]) && $_GET["lng"] && $_GET["latd"] && $_GET["lngd"] && $_GET["building"]) {
  $lat = $_GET["lat"];    // Isi yang dicari
  $lng = $_GET["lng"];
  $latd = $_GET["latd"];    // Isi yang dicari
  $lngd = $_GET["lngd"];
  $building =$_GET['building'];
}else{
  $lat ="null";    // Isi yang dicari
  $lng ="null";
  $latd ="null";    // Isi yang dicari
  $lngd ="null";
    $building = "null";
}
 ?>
<!DOCTYPE html>
<html>
  <head>
      <?php include('resources/head.php'); ?>
      <style media="screen">
        html,body{
          height: 100%;
        }
      </style>
  </head>
  <body>
    <div id="map"></div>
    <?php include('resources/modal/legend_modal.php'); ?>
    <?php include('resources/modal/layer_modal.php'); ?>
    <script>
      var map;
      var latposition = <?php echo $lat ?>;
      var lngposition = <?php echo $lng ?>;
      var latd = <?php echo $latd ?>;
      var lngd = <?php echo $lngd ?>;
      var currentlocation;
      var centerLokasi;
      var building ="<?php echo $building ?>";
      function initMap() {

        var photo;
        switch (building) {
          case "house":
              photo = "home.png";
            break;
          case "office":
              photo = "kantor.png";
            break;
          case "msme":
              photo = "kadai.png";
            break;
          case "health":
              photo = "kesehatan.png";
            break;
          case "educational":
              photo = "sekolah.png";
            break;
          case "worship":
              photo = "musajik.png";
            break;
          default:  photo = "home.png";
            break;
        }

          currentlocation = {lat: latposition, lng: lngposition};
          centerLokasi = {lat: latd, lng: lngd};
          loadMap(latposition,lngposition);
          setLayerAll();
          markerposition.setMap(null);
          setMarkerPosition(latposition,lngposition,'Current Position');

         var markerku = new google.maps.Marker({
             position: centerLokasi,
              icon:{ url: ""+server+"/img/"+photo+"" },
              map: map
            });
         callRoute(currentlocation, centerLokasi,'lightblue',markerku);

         google.maps.event.addListener(markerposition, 'dragstart', function() {
           updateMarkerAddress('Dragging...');
         });

         google.maps.event.addListener(markerposition, 'drag', function() {
           updateMarkerStatus('Dragging...');
           updateMarkerPosition(markerposition.getPosition());
           if (infowindow) {
             infowindow.close();
           }
           infowindow.open(map,markerposition);
         });

         google.maps.event.addListener(markerposition, 'dragend', function() {
           updateMarkerStatus('Drag ended');
           geocodePosition(markerposition.getPosition(),infowindow);
           console.log( markerposition.getPosition().lat()+" | "+markerposition.getPosition().lng());
           var latnow = markerposition.getPosition().lat().toString();
           var lngnow = markerposition.getPosition().lng().toString();
           var currentlocation = {lat: latnow, lng: lngnow};
           directionsDisplay.setMap(null);
           callRoute(markerposition.getPosition(), centerLokasi,'lightblue',markerku);

           console.log(latnow+"|"+lngnow);
           B4A.CallSub('Marker_DragEnd', true, latnow, lngnow);
           if (infowindow) {
             infowindow.close();
           }
           infowindow.setContent("Current Position");
           infowindow.open(map,markerposition);
         });

      }
    </script>

    <?php include('resources/footer.php'); ?>
  </body>
</html>