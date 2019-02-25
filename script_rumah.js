function tampilsemuarumah(){ //menampilkan semua rumah

  $.ajax({ url: 'act/rumah_tampil.php', data: "", dataType: 'json', success: function (rows){
    cari_rumah(rows);
  }});

}

function rumahkosong(){ 
  $.ajax({ url: 'act/rumah_kosong.php', data: "", dataType: 'json', success: function (rows){
    cari_rumah(rows);
  }});
}

function rumahberpenghuni(){ 
  $.ajax({ url: 'act/rumah_berpenghuni.php', data: "", dataType: 'json', success: function (rows){
    cari_rumah(rows);
  }});
}

function cari_rumah(rows)
{   
	hapusInfo();
	hapusRadius();
	clearroute2();
	hapusMarkerTerdekat();
	$('#hasilcari').empty();
	if(rows==null)
		{
	     $('#kosong').modal('show');
	    }
  var a=0;
	for (var i in rows) 
	    {   
			var row     = rows[i];
		  	var id   = row.id;
		    var latitude  = row.latitude ;
		    var longitude = row.longitude ;
		    centerBaru = new google.maps.LatLng(latitude, longitude);
		    marker = new google.maps.Marker
		       	({
		          position: centerBaru,
		          icon:'assets/ico/home.png',
		          map: map,
		          animation: google.maps.Animation.DROP,
		        });
		        markersDua.push(marker);
		        map.setCenter(centerBaru);
				    klikInfoWindow(id);
		        map.setZoom(14);            
            tampilkanhasilcari();
		        $('#hasilcari').append("<tr><td>"+id+"</td><td style='text-align: center'><button class='btn btn-theme04 btn-xs' onclick='detailrumah_infow(\""+id+"\");' title='tampilkan info'><i class='fa fa-search-plus'></i></button></td></tr>");
            a=a+1;
	    }
      $('#found').append("Found: "+a)
      $('#hidecari').show();
}


function klikInfoWindow(id)
{
    google.maps.event.addListener(marker, "click", function(){
        console.log("marker dengan id="+id+" diklik");
        detailrumah_infow(id);
      });
}


function detailrumah_infow(id){  //menampilkan informasi rumah
  hapusInfo();
  clearroute2();
  console.log("fungsi info marker id="+id);
    $.ajax({url: 'act/rumah_detail.php?cari='+id, data: "", dataType: 'json', success: function(rows)
      {
         for (var i in rows) 
          { 
            var row = rows[i];
            var id = row.id;
            //var nama = row.name;
            if (row.image==null) {
              var image = "There are no photos for this building";
            }
            else {
              var image = "<img src='foto/rumah/"+row.image+"' alt='building photo' width='165'>";
            }
            var latitude  = row.latitude; 
            var longitude = row.longitude ;
            console.log(image);
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/ico/home.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
            markersDua.push(marker);
            map.setCenter(centerBaru);
            klikInfoWindow(id);
            map.setZoom(18); 
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<span style=color:black><center><b>Information</b><br>"+image+"<br><i class='fa fa-home'></i> "+id+"</center><a role='button' class='btn btn-default fa fa-car' onclick='callRoute(centerLokasi, centerBaru);rutetampil();'> Show Route</a> <a role='button' class='btn btn-default fa fa-info-circle' target='_blank' href='detailrumah.php?id="+id+"'> View Details</a>&nbsp</span>",
            pixelOffset: new google.maps.Size(0, -33)
            });
            infoDua.push(infowindow); 
            hapusInfo();
            infowindow.open(map);
          }  
        }
      }); 
}

function aktifkanRadius() { //fungsi radius rumah
  if (pos == 'null') {
    $('#atur-posisi').modal('show');
  } else {
    hapusRadius();
    clearroute2();
    var inputradiusrumah = document.getElementById("inputradius").value;
    var circle = new google.maps.Circle({
      center: pos,
      radius: parseFloat(inputradiusrumah * 100),
      map: map,
      strokeColor: "blue",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "blue",
      fillOpacity: 0.35
    });
    map.setZoom(15);
    map.setCenter(pos);
    circles.push(circle);
    teksradius()
  }
  cekRadiusStatus = 'on';
  tampilkanradius();
}


 function tampilkanradius(){ //menampilkan rumah berdasarkan radius
   console.log("panggil radiusnyaa");
    $('#hasilcari1').show();
    $('#hasilcari').empty();
    $('#found').empty();
      hapusInfo();
      hapusMarkerTerdekat();
      cekRadius();
      clearroute2();

        $.ajax({ 
        url: 'act/rumah_radius.php?lat='+pos.lat+'&lng='+pos.lng+'&rad='+rad, data: "", dataType: 'json', success: function(rows)
        {
            for (var i in rows) 
            {   
              var row     = rows[i];
              var id   = row.id;
              var nama   = row.name;
              var latitude  = row.latitude ;
              var longitude = row.longitude ;
              centerBaru = new google.maps.LatLng(latitude, longitude);
              marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/ico/home.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              markersDua.push(marker);
              map.setCenter(centerBaru);
        klikInfoWindow(id);
              map.setZoom(14);
              tampilkanhasilcari();
              $('#hasilcari').append("<tr><td>"+nama+"</td><td style='text-align: center'><button class='btn btn-theme04 btn-xs' onclick='detaiumkm(\""+id+"\");' title='tampilkan info'><i class='fa fa-search-plus'></i></button></td></tr>");
            } 
            }    
          });
}

function cekRadius()
  {
    rad = inputradius.value*100;
    }

function teksradius()
  {
    document.getElementById('km').innerHTML=document.getElementById('inputradius').value*100
  }

function cari_idrumah() { 
  var idrumah = document.getElementById("id-rumah").value;
  console.log("cari rumah dengan id: " + idrumah);
  if (idrumah==null || idrumah=="") {
    $('#ket-p').empty();
    $('#peringatan').modal('show');
    $('#ket-p').append('enter survey ID !');
  }
  else {
    $.ajax({
      url: 'act/rumah_cari-id.php?id=' + idrumah,
      data: "",
      dataType: 'json',
      success: function (rows) {
        cari_rumah(rows);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        $('#gagal').modal('show');
        $('#notifikasi').append(xhr.status);
        $('#notifikasi').append(thrownError);
      }
    });
  }
}