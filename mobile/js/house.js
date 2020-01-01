function HouseSearchId(lat,lng,id){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-id.php?id='+id+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchHolder(lat,lng,nama){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-penghuni.php?nama='+nama+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchOwner(lat,lng,nama){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-pemilik.php?nama='+nama+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchFcnHolder(lat,lng,kk){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-kkpenghuni.php?kk='+kk+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchNinHolder(lat,lng,nik){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-nikpenghuni.php?nik='+nik+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchNinOwner(lat,lng,nik){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-nikpemilik.php?nik='+nik+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchTribe(lat,lng,tribe){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-suku.php?suku='+tribe+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}


function HouseSearchCons(lat,lng,cons){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-jeniskonstruksi.php?k='+cons+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchYear(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-tahun.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchElectric(lat,lng,start,end){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_cari-listrik.php?awal='+start+'&akhir='+end+'';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchEmpty(lat,lng){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_kosong.php';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}

function HouseSearchInhabited(lat,lng){
  clearMarker();
  hapusRadius();
  markerposition.setMap(null);
  setMarkerPosition(lat,lng,'Current Position');
  var url = server+'act/rumah_berpenghuni.php';
   console.log(url);
   $.ajax({url: url, data: "", dataType: 'json', success: function(rows){
     console.log(rows.length);
       showDataSearch(rows,"home.png");
       setMapOnAll(map);
       DraggerListerner();
   }});//end ajax
}
