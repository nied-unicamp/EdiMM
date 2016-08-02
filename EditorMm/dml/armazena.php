<html>
<head>
<title>Conexao EditorMm</title>
</head>
<body>
	<?php
	$id = $_REQUEST["id"];
	$svg = $_REQUEST["svg"];
	$servername = "localhost";
	$username = "root";
	$password = "Myfen80n";
	$dbname = "EditorMm";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	
		if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
		} 

	$sql = "DELETE FROM `SVGTABLE` WHERE `id`='".$id."'";
	$conn->query($sql);

	$sql = "INSERT INTO `SVGTABLE`(`id`, `tag_svg`) VALUES ('".$id."','".$svg."')";
	//$sql = "INSERT INTO `SVGTABLE`(`tag_svg`) VALUES ('".$svg."')";

		if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
		} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
		}
		
	$conn->close();
	?>
</body>
</html>