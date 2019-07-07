<?php

	

	define ('DB_USER', "root");

	define ('DB_PASSWORD', "root");

	define ('DB_DATABASE', "otlaat");

	define ('DB_HOST', "localhost");

	$con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);

	if (mysqli_connect_errno())
	  {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  }
	$sql = "SELECT HotelCode, HotelName FROM hotels 

			WHERE HotelName LIKE '%".$_GET['query']."%'

			LIMIT 10";  

	$result = mysqli_query($con,$sql);

	

	$json = [];



	while($row = mysqli_fetch_assoc($result) ){

	     $json[] = $row['HotelName'];
	     $json[] = $row['HotelCode'];

	}


	echo json_encode($json);