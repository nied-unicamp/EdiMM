<html>
<head><title>Conexao EditorMm</title></head> <body>
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
