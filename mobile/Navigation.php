<!DOCTYPE html>
<html>
  <head>
    <?php include('resources/head.php'); ?>
    <?php

      $lat = $_GET["lat"]; if (empty($_GET["lat"])) {$lat="null";}   // Isi yang dicari
      $lng = $_GET["lng"]; if (empty($_GET["lng"])) { $lng="null";}
      $latd = $_GET["latd"];  if (empty($_GET["latd"])) {$latd="null";}  // Isi yang dicari
      $lngd = $_GET["lngd"]; if (empty($_GET["lngd"])) { $lngd="null";}
      $building = $_GET["building"]; if (empty($_GET["building"])) {$building="null";}
      $mode=$_GET["mode"]; if (empty($_GET["mode"])) {$mode='DRIVING';}
     ?>

    <style media="screen">
    #directionsPanel{
      height: auto;
      background: pink;
    }
      table#directionsTable{
        width: 100%;
      }
      tr.routes-table td{
        padding: 5px;
        background: #ececec;
        margin: 0px;
        border: 0px;

      }
       td{
           font-size: 13px;
       }
       .tessidang{
         background-color: green;
         width: 100%;
         height: 50px;
       }

    </style>

  </head>


  <body>
    <div id="directionsPanel">

    </div>
    <div class="tessidang">

    </div>

</div>
  <script>
    var map;
    var latposition = <?php echo $lat ?>;
    var lngposition = <?php echo $lng ?>;
    var latd = <?php echo $latd ?>;
    var lngd = <?php echo $lngd ?>;
    var building ="<?php echo $building ?>";
    var currentlocation;
    var centerLokasi;
    var travelModeName='<?php echo $mode ?>';
    function initMap() {
      //loadMap(latposition,lngposition);

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
        default:  photo = "sekolah.png";

      }

      currentlocation = {lat: latposition, lng: lngposition};
      centerLokasi = {lat: latd, lng: lngd};
      var travelDiv = document.createElement('div');
      var markerku = new google.maps.Marker({
          position: centerLokasi,
           icon:{ url: ""+server+"/img/"+photo+"" },
           map: map
         });
      callRouteNavigation(currentlocation, centerLokasi,""+server+"/img/"+photo+"", travelModeName);
      console.log("yaa");

    }
  </script>
    <?php include('resources/footer.php'); ?>
  </body>
</html>
