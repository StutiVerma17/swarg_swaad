<?php
// db.php
// This file creates a connection to the MySQL database using MySQLi

$servername = "localhost";   // XAMPP MySQL server
$username   = "root";        // default XAMPP user
$password   = "";            // default XAMPP has empty password
$dbname     = "swarg_swaad"; // the database you created

// Create connection object
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // If connection fails, stop the script and show error
    die("Connection failed: " . $conn->connect_error);
}
?>
