<?php

	$host = "hansken.db.elephantsql.com";
	$user = "afwubqsz";
	$pass = "zsyYhSpPHhV3N8Xk0uxdWkXWdI2Fv7bP";
	$port = "5432";
	$dbname = "afwubqsz";
	$conn = pg_connect("host=".$host." port=".$port." dbname=".$dbname." user=".$user." password=".$pass) or die("Gagal");

?>
