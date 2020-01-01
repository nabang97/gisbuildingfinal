function MsmeSearchName(lat,lng,nama){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/umkm_cari-nama.php?cari_nama='+nama+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kadai.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function MsmeSearchType(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/umkm_cari-jenis.php?type='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kadai.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function MsmeSearchJorong(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/umkm_cari-jorong.php?j='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kadai.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function MsmeSearchCons(lat,lng,cons){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/umkm_cari-jeniskonstruksi.php?k='+cons+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kadai.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function MsmeSearchIncome(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/umkm_cari-pendapatan.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kadai.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function MsmeSearchFacility(lat,lng,fas){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  console.log(fas);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/umkm_cari-fasilitas.php?fas='+fas;
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kadai.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function MsmeSearchRadius(lat,lng,rad){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  showRadius(lat,lng,rad);
  var url = server+'act/umkm_radius.php?lat='+lat+'&lng='+lng+'&rad='+rad+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"kadai.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}
