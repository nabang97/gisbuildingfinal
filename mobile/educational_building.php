<?php
// header('content-type: application/json');
// header("access-control-allow-origin: *");
if (isset($_GET['lat']) && isset($_GET['lng'])) {
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
include('useless/Educational/data_educational.php');
 ?>


 <!DOCTYPE html>
 <html lang="en" dir="ltr">
 <head>
   <title>Simple Map</title>
   <meta name="viewport" content="initial-scale=1.0">
   <meta charset="utf-8">
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <link rel="stylesheet" href="assets/fontawesome-free-5.6.3-web/css/all.css">
   <link rel="stylesheet" href="css/style.css">
   <style>
     /* Always set the map height explicitly to define the size of the div
      * element that contains the map. */
     #map {
       height: 100%;
     }
     /* Optional: Makes the sample page fill the window. */
     html, body {
       height: 100%;
       margin: 0;
       padding: 0;
     }
     .sweet-load{
       height: 100vh;
       width: 100vw;
       background-color: white;
       z-index: 9999999;
       position: fixed;
       display: flex;
       align-items: center;
     }
   </style>
 </head>
   <body>
     <div class="sweet-load" id="lottie">
       <img src="img/loading-index.svg" alt="" width="100" style="margin:0 auto">
     </div>
     <div id="map"></div>
     <?php include('resources/modal/legend_modal.php'); ?>
     <?php include('resources/modal/layer_modal.php'); ?>
     <script src="js/jquery-3.4.0.min.js" charset="utf-8"></script>
     <script src="js/script.js"></script>
     <script>
       var lat = <?php echo $lat ?>;
       var lng = <?php echo $lng ?>;
       function initMap() {
         loadMap(lat,lng);
         setLayerAll();

           var a = <?php echo $datajson; ?>;
           if (a == null) {
             console.log("DATA NGGAK ADA");
           }
           else {
             console.log(a);
             panjang=a.length;
             if (panjang > 0) {
               console.log(a[0]['latitude']);
                 for (i=0; i < panjang; i++) {
                   var latitude =parseFloat(a[i]['latitude'])
                   var longitude = parseFloat(a[i]['longitude']);
                   var myLatLng = {lat: latitude, lng:longitude };

                   var marker = new google.maps.Marker({
                      position: myLatLng ,
                      map: map,
                      title: a[i]['name'],
                      icon:{ url: ""+server+"/img/sekolah.png" }
                     });

                }
             }
           }
           centerBaru = new google.maps.LatLng({lat:-0.3209284, lng: 100.3484996});
           map.setCenter(centerBaru);
           map.setZoom(14);
           markerposition.setDraggable(false);

          }
          $( document ).ajaxStart( function() {
              $( "#lottie" ).fadeIn();
                  $( "#lottie" ).css({
                  left: ( $( window ).width() - 32 ) / 2 + "px", // 32 = lebar gambar
                  top: ( $( window ).height() - 32 ) / 2 + "px", // 32 = tinggi gambar
                  display: "block"
                })
          }).ajaxComplete( function() {
            $( "#lottie" ).fadeOut();
          });
          if (tunggu==true) {
              $( "#lottie" ).fadeOut();
              tunggu=false;
          }

     </script>
     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&callback=initMap"
     async defer></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

   </body>
 </html>
