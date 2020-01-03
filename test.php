<?php
$currentLat = "-1.2380149"; //garis bujur lokasi 1
$currentLon = "116.8381812"; //garis lintang lokasi 1
$destLat = "-1.2301204"; //garis bujur lokasi 2
$destLon = "116.8234827"; //garis lintang lokasi 2
echo hitungJarak($currentLat,$currentLong, $destLat, $destLon);

function hitungJarak($lokasi1_lat, $lokasi1_long, $lokasi2_lat, $lokasi2_long, $unit = 'km', $desimal = 2) {
 // Menghitung jarak dalam derajat
 $derajat = rad2deg(acos((sin(deg2rad($lokasi1_lat))*sin(deg2rad($lokasi2_lat))) + (cos(deg2rad($lokasi1_lat))*cos(deg2rad($lokasi2_lat))*cos(deg2rad($lokasi1_long-$lokasi2_long)))));
  
 // Mengkonversi derajat kedalam unit yang dipilih (kilometer, mil atau mil laut)
 switch($unit) {
  case 'km':
   $jarak = $derajat * 111.13384; // 1 derajat = 111.13384 km, berdasarkan diameter rata-rata bumi (12,735 km)
   break;
  case 'mi':
   $jarak = $derajat * 69.05482; // 1 derajat = 69.05482 miles(mil), berdasarkan diameter rata-rata bumi (7,913.1 miles)
   break;
  case 'nmi':
   $jarak =  $derajat * 59.97662; // 1 derajat = 59.97662 nautic miles(mil laut), berdasarkan diameter rata-rata bumi (6,876.3 nautical miles)
 }
 return round($jarak, $desimal);
}