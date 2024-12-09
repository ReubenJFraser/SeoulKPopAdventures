<?php
// Set CORS headers to allow all origins and set JSON content type
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// Enable error reporting for debugging during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mapmarkers";  // Updated database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500); // Internal server error
    echo json_encode([
        'error' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit;
}

// SQL query to fetch data from the restaurants table
$sql = "SELECT 
    RestaurantID, 
    `RestaurantName-English` as RestaurantName_English, 
    `RestaurantName-Korean` as RestaurantName_Korean,
    Address,
    District,
    Neighborhood,
    Longitude,
    Latitude, 
    CuisineCategory, 
    CuisineSubcategory,
    Description,   
    SignatureDishes,
    RestaurantFeatures,
    DiningStyle,
    TripAdvisorLink,
    MichelinGuideLink,
    TripAdvisorRating,
    MichelinGuideRating,
    TasteOfSeoulYrsInc,
    Awards,
    VegetarianFriendly,
    VeganOptions,
    HalalOptions,
    GlutenFreeOptions,
    GoodFor,
    Hours,
    SpecialHours,
    OpenNow,
    Telephone,
    OnlineBooking,
    `TripAdvisor-PriceCategory` as TripAdvisor_PriceCategory,
    PriceCategory,
    PriceRangeIcon,
    PriceRangeTooltip,
    ImageURL,
    Icons,
    AdditionalInfo
FROM restaurants";  // Updated table name

// Execute SQL query
$result = $conn->query($sql);
$data = array();

if ($result) {
    if ($result->num_rows > 0) {
        // Output data of each row
        while ($row = $result->fetch_assoc()) {
            // Convert data to the correct types (e.g., latitude and longitude to float)
            $row['Latitude'] = (float)$row['Latitude'];
            $row['Longitude'] = (float)$row['Longitude'];
            $data[] = $row;
        }
    } else {
        http_response_code(404); // Not found
        $data = ['message' => 'No records found'];
    }
} else {
    // Log the SQL error if the query fails
    http_response_code(500); // Internal server error
    $data = ['error' => 'SQL query failed: ' . $conn->error];
}

$conn->close();

// Output the data in JSON format with error handling
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>





