<?php
header("access-control-allow-origin: *");
  $lat = $_GET["lat"];    // Isi yang dicari
  $lng = $_GET["lng"];
  $rad = $_GET["rad"];
 ?>
<!DOCTYPE html>
<html>
  <head>
    <?php include('../resources/head.php'); ?>
  </head>
  <body>
    <?php include('../resources/loading_page.php'); ?>
    <div id="map"></div>
    <?php include('../resources/modal/legend_modal.php'); ?>
    <?php include('../resources/modal/layer_modal.php'); ?>
    <script>
      var lat = <?php echo $lat ?>;
      var lng = <?php echo $lng ?>;
      var rad = <?php echo $rad ?>;
      function initMap() {

        loadMap(lat,lng);
        setLayerAll();

        //var a = <?php //echo $datajson; ?>;
        //showDataSearch(a,"kantor.png");
        //markerposition.setDraggable(false);
        var latlng = new google.maps.LatLng(lat, lng);
        var circle = new google.maps.Circle({
          center: latlng,
          radius: rad,
          map: map,
          strokeColor: "blue",
          strokeOpacity: 0.5,
          strokeWeight: 1,
          fillColor: "blue",
          fillOpacity: 0.35
        });

         var url = server+'Office/search_radius.php?lat='+lat+'&lng='+lng+'&rad='+rad+'';
        console.log(url);
        $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
            for (var i in rows){
              var row = rows[i];
              var id = row.id;

              var marker = new google.maps.Marker({
                 position: {lat: parseFloat(row.latitude), lng:  parseFloat(row.longitude)},
                 map: map,
                 title: row.name,
                 icon:{ url: "../img/kantor.png" }
                });
               markers.push(marker);
               console.log(row);
               console.log(id);
            }//end for

        }});//end ajax

        DraggerListerner();
        // console.log("et");
        // $( "#lottie" ).fadeOut();
        // console.log("finisedh");
      }
    </script>
    <?php include('../resources/footer.php'); ?>
  </body>
</html>
