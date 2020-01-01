function HealthSearchName(lat,lng,nama){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kesehatan_cari-nama.php?cari_nama='+nama+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kesehatan.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HealthSearchType(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kesehatan_cari-jenis.php?type='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kesehatan.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HealthSearchJorong(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kesehatan_cari-jorong.php?j='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kesehatan.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HealthSearchCons(lat,lng,cons){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kesehatan_cari-jeniskonstruksi.php?k='+cons+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kesehatan.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HealthSearchYear(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kesehatan_cari-tahun.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kesehatan.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HealthSearchFacility(lat,lng,fas){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  console.log(fas);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kesehatan_cari-fasilitas.php?fas='+fas;
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kesehatan.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HealthSearchRadius(lat,lng,rad){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  showRadius(lat,lng,rad);
  var url = server+'act/kesehatan_radius.php?lat='+lat+'&lng='+lng+'&rad='+rad+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kesehatan.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}
