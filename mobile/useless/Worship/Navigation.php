<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" href="../css/style.css">

    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        display: none;
      }
      #directionsPanel{
        width: 100%;
        height: auto;
      }
      img.adp-marker2 {
        width: 27px;
        height: 43px;
        display: block;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: scroll;
      }
    </style>
    <?php
    if (isset($_GET["lat"]) && $_GET["lng"] && $_GET["latd"] && $_GET["lngd"]) {
      $lat = $_GET["lat"];    // Isi yang dicari
      $lng = $_GET["lng"];
      $latd = $_GET["latd"];    // Isi yang dicari
      $lngd = $_GET["lngd"];
    }else{
      $lat ="null";    // Isi yang dicari
      $lng ="null";
      $latd ="null";    // Isi yang dicari
      $lngd ="null";
    }
     ?>

    <style media="screen">
    #directionsPanel{
      height: auto;
    }
      table#directionsTable{
        width: 100%;
      }
      tr.routes-table td{
        padding: 5px;
        background: lightblue;
        margin: 0px;
        border: 0px;
      }

    </style>

  </head>


  <body>
    <div id="map"></div>
    <div id="directionsPanel">

    </div>
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p id="content"></p>
    </div>

</div>
  <script>


    var map;
    var lat = <?php echo $lat ?>;
    var lng = <?php echo $lng ?>;
    var latd = <?php echo $latd ?>;
    var lngd = <?php echo $lngd ?>;
    var currentlocation;
    var centerLokasi;

    function initMap() {
      if (lat == null|| lng == null || latd == null || lngd == null) {
        //alert("Set your current location and destination location");
        currentlocation = {lat: -0.3209284, lng: 100.3484996}
        centerLokasi = null;
        map = new google.maps.Map(document.getElementById('map'), {
          center: currentlocation ,
          zoom: 13
        });
        document.getElementsByClassName('modal')[0].style.display = 'block';
        document.getElementById("content").innerHTML = "Please your position first";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
          document.getElementsByClassName('modal')[0].style.display = 'none';
        }

      }else {
        currentlocation = {lat: lat, lng: lng}
        centerLokasi = {lat: latd, lng: lngd}
        map = new google.maps.Map(document.getElementById('map'), {
          center: currentlocation ,
          zoom: 13
        });
        var marker = new google.maps.Marker({position: currentlocation, map: map});
        marker.info = new google.maps.InfoWindow({
          content: '<center><a>Your Position</a></center>',
          pixelOffset: new google.maps.Size(0, -1)
            });
        marker.info.open(map, marker)
      }
       if (centerLokasi!= null) {
         var markerku = new google.maps.Marker({
           position: centerLokasi,
            icon:{ url: ""+server+"img/musajik.png" },
            map: map
          });
          var img_url = '../img/musajik.png';
         callRoute(currentlocation, centerLokasi,'blue',markerku,img_url);

       }

       

    }
  </script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&callback=initMap"
  async defer></script>
  <script src="../js/script.js"></script>
  <script src="../js/jquery-3.4.0.min.js" charset="utf-8"></script>
  </body>
</html>
