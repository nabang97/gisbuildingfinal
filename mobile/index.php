<?php
 //header('content-type: application/json');
//header("access-control-allow-origin: *");
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
 ?>

 <!DOCTYPE html>
 <html>
   <head>
     <title>Simple Map</title>
     <meta name="viewport" content="initial-scale=1.0">
     <meta charset="utf-8">
     <script src="js/jquery-3.4.0.min.js" charset="utf-8"></script>
     <script src="js/script.js"></script>
     <script src="js/office.js"></script>
      <script src="js/health.js"></script>
      <script src="js/educational.js"></script>
      <script src="js/msme.js"></script>
      <script src="js/worship.js"></script>
      <script src="js/house.js"></script>
     <!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE"></script> -->
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

     <script>
       var map;
       var latposition = <?php echo $lat ?>;
       var lngposition = <?php echo $lng ?>;
       var tunggu=true;
       function initMap() {
         loadMap(latposition,lngposition);
         setLayerAll();
         markerposition.setDraggable(false);
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
         //OfficeSearchName(latposition,lngposition,'balai')
        //OfficeSearchFacility(latposition,lngposition,"F03,F02")
       }


     </script>
     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&callback=initMap"
     async defer></script>
     <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

   </body>
 </html>
