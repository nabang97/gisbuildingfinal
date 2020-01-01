function WorshipSearchName(lat,lng,nama){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-nama.php?cari_nama='+nama+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchType(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-jenis.php?type='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchJorong(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-jorong.php?j='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchCons(lat,lng,cons){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-jeniskonstruksi.php?k='+cons+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchYear(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-tahun.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchFacility(lat,lng,fas){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  console.log(fas);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-fasilitas.php?fas='+fas;
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchRadius(lat,lng,rad){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  showRadius(lat,lng,rad);
  var url = server+'act/ibadah_radius.php?lat='+lat+'&lng='+lng+'&rad='+rad+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchLand(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-luastanah.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function WorshipSearchBuilding(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/ibadah_cari-luasbang.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"musajik.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}
