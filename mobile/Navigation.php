<!DOCTYPE html>
<html>
  <head>
    <?php include('resources/head.php'); ?>
    <?php
    if (isset($_GET["lat"]) && $_GET["lng"] && $_GET["latd"] && $_GET["lngd"] && $_GET["building"]) {
      $lat = $_GET["lat"];    // Isi yang dicari
      $lng = $_GET["lng"];
      $latd = $_GET["latd"];    // Isi yang dicari
      $lngd = $_GET["lngd"];
      $building = $_GET['building'];
    }else{
      $lat ="null";    // Isi yang dicari
      $lng ="null";
      $latd ="null";    // Isi yang dicari
      $lngd ="null";
      $building = "null";
    }
     ?>

    <style media="screen">
    #directionsPanel{
      height: auto;
      background: white;
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

    </style>

  </head>


  <body>
    <div id="directionsPanel">

    </div>

</div>
  <script>
    var map;
    var latposition = <?php echo $lat ?>;
    var lngposition = <?php echo $lng ?>;
    var latd = <?php echo $latd ?>;
    var lngd = <?php echo $lngd ?>;
    var building = <?php echo $building ?>;
    var currentlocation;
    var centerLokasi;

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
      var markerku = new google.maps.Marker({
          position: centerLokasi,
           icon:{ url: ""+server+"/img/"+photo+"" },
           map: map
         });
      callRouteNavigation(currentlocation, centerLokasi,""+server+"/img/"+photo+"");
      console.log("yaa");

    }
  </script>
    <?php include('resources/footer.php'); ?>
  </body>
</html>
