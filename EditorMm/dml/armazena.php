<!--
/************************************************************************************************
* Editor for multisemiotic text production, dealing with multidevice and multimodal interaction *
*																							    *
* Copyright (C) see <link para equipe>														    *
*																							    *
* This program is free software; you can redistribute it and/or                                 *
* modify it under the terms of the GNU General Public License                                   *
* as published by the Free Software Foundation; either version 2                                *
* of the License, or (at your option) any later version.									    *
*																						        *
* This program is distributed in the hope that it will be useful,                               *
* but WITHOUT ANY WARRANTY; without even the implied warranty of                                *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                                 *
* GNU General Public License for more details.                                                  *
*																							  	*
* You should have received a copy of the GNU General Public License								*
* along with this program.  If not, see <https://www.gnu.org/licenses/gpl-2.0.html>.			*
************************************************************************************************/
-->
<html>
<head>
<title>Conexao EditorMm</title>
</head>
<body>
	<?php
	$id = $_REQUEST["id"];
	$tag_svg = $_REQUEST["tag_svg"];
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "EditorMm";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	
		if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
		} 
	
	
	$sql = "SELECT `id` FROM `SVGTABLE` WHERE `id`='".$id."'";
	
	$result = $conn->query($sql);

	$row = $result->fetch_assoc();
		
			if($row["id"] == $id){
				
			$sql = "UPDATE `SVGTABLE` SET `tag_svg` ='".$tag_svg."' WHERE `id`='".$id."'";
			
			}else{
			
			$sql = "INSERT INTO `SVGTABLE`(`id`, `tag_svg`) VALUES ('".$id."','".$tag_svg."')";
			
			}
		

	if ($conn->query($sql) === TRUE) {
	
		echo "New record created successfully";
		
	} else {
	
		echo "Error: " . $sql . "<br>" . $conn->error;
		
	}
		
	$conn->close();
	
	?>
</body>
</html>