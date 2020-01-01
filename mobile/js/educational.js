function EducationalSearchName(lat,lng,nama){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-nama.php?cari_nama='+nama+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchType(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-tipe.php?type='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchLevel(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-jenistingkat.php?type='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchJorong(lat,lng,type){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-jorong.php?j='+type+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchCons(lat,lng,cons){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-jeniskonstruksi.php?k='+cons+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchLand(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-luastanah.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchBuilding(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-luasbang.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchFacility(lat,lng,fas){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  console.log(fas);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/pendidikan_cari-fasilitas.php?fas='+fas;
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function EducationalSearchRadius(lat,lng,rad){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  showRadius(lat,lng,rad);
  var url = server+'act/pendidikan_radius.php?lat='+lat+'&lng='+lng+'&rad='+rad+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"sekolah.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}
