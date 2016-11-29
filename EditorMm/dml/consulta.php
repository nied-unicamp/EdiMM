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

	$sql = "SELECT `tag_svg` FROM `SVGTABLE` WHERE `id`='".$id."'";
	$svg = $conn->query($sql);

	$resultado = "";
	
		if ($svg->num_rows >= 0) {
		// output data of each row
			while($row = $svg->fetch_assoc()) {
			$resultado .= $row["tag_svg"];
			}
		} else {
		echo "0 results";
		}

	echo($resultado);
	//header('Content-Type: application/json');
	//echo json_encode($resultado);
	//echo($resultado);
	$conn->close();
	?>
</body>
</html>