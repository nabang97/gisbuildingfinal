<?php
 include('CheckLoc.php');
 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
		<title></title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/fontawesome-free-5.6.3-web/css/all.css">
		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE"></script>
    <script src="js/jquery-3.4.0.min.js" charset="utf-8"></script>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js"></script>
		<script type="text/javascript">
			var geocoder = new google.maps.Geocoder();
			var lat = <?php echo $lat ?>;
      var lng = <?php echo $lng ?>;
			var map, markerposition;


			function initialize() {
        var legenda = document.createElement('div');
				var latLng = new google.maps.LatLng(lat, lng);
			  map = new google.maps.Map(document.getElementById('mapCanvas'), {
					zoom: 13,
					center: latLng,
					disableDefaultUI: true,
          styles: myStyle
				});
        MyLegend();
				markerposition = new google.maps.Marker({
					position: latLng,
					title: 'Your Position',
					map: map,
					draggable: false
				});

        infowindow = new google.maps.InfoWindow({
          position: latLng,
          disableAutoPan: true,
          content: "<a style='color:black;'>You Are Here</a> "
        });
        infowindow.open(map, markerposition);
				//MarkerInfo(markerposition,'Drag Me');


        setLayerAll();
        //$("#myModal").modal("show");
        DraggerListerner();
			}

			google.maps.event.addDomListener(window, 'load', initialize);
		</script>
		<style>
		/* Optional: Makes the sample page fill the window. */
		html, body {
			height: 100%;
			margin: 0;
			padding: 0;
		}
			#mapCanvas {
				height: 100%;
			}
			#infoPanel {
				margin-left: 10px;
			}
			#infoPanel div {
				margin-bottom: 5px;
			}
		</style>
	</head>
	<body>
    <?php include('resources/modal/legend_modal.php'); ?>
    <?php include('resources/modal/layer_modal.php'); ?>
		<div id="mapCanvas"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

	</body>
</html>
