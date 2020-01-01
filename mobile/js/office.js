function OfficeSearchName(lat,lng,nama){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kantor_cari-nama.php?cari_nama='+nama+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kantor.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function OfficeSearchType(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kantor_cari-jenis.php?type='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kantor.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function OfficeSearchJorong(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kantor_cari-jorong.php?j='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kantor.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function OfficeSearchCons(lat,lng,cons){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kantor_cari-jeniskonstruksi.php?k='+cons+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kantor.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function OfficeSearchYear(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kantor_cari-tahun.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kantor.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function OfficeSearchFacility(lat,lng,fas){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  console.log(fas);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/kantor_cari-fasilitas.php?fas='+fas;
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kantor.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function OfficeSearchRadius(lat,lng,rad){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  showRadius(lat,lng,rad);
  var url = server+'act/kantor_radius.php?lat='+lat+'&lng='+lng+'&rad='+rad+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kantor.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}
