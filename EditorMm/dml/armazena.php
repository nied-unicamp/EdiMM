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