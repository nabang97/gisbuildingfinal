<?php

	//$host = "localhost";
	//$user = "postgres";
	//$pass = "root";
	//$port = "5432";
	//$dbname = "gibuilding";

	// $host = "otto.db.elephantsql.com";
	// $user = "mlfkcwyr";
	// $pass = "G3HHlRihRkOb8_4zn6HHJaLXKRbkaafD";
	// $port = "5432";
	// $dbname = "mlfkcwyr";

	$host = "hansken.db.elephantsql.com";
	$user = "afwubqsz";
	$pass = "zsyYhSpPHhV3N8Xk0uxdWkXWdI2Fv7bP";
	$port = "5432";
	$dbname = "afwubqsz";

	$conn = pg_connect("host=".$host." port=".$port." dbname=".$dbname." user=".$user." password=".$pass) or die("Gagal");

?>
