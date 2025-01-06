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
$dbname = "mapmarkers"; // Updated database name

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

// Determine the request method (GET or POST)
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
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
        AdditionalInfo,
        is_liked,
        liked_at,
        is_bookmarked,
        bookmarked_at,
        is_blocked,
        blocked_at,
        is_reported,
        reported_at
    FROM restaurants"; // Updated table name

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

    // Output the data in JSON format with error handling
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} elseif ($requestMethod === 'POST') {
    // Handle updates for like, bookmark, block, and report actions
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['RestaurantID'], $data['action'])) {
        $restaurantID = $conn->real_escape_string($data['RestaurantID']);
        $action = $conn->real_escape_string($data['action']);
        $currentTime = date('Y-m-d H:i:s');

        switch ($action) {
            case 'like':
                $sql = "UPDATE restaurants SET is_liked = 1, liked_at = '$currentTime' WHERE RestaurantID = $restaurantID";
                break;
            case 'unlike':
                $sql = "UPDATE restaurants SET is_liked = NULL, liked_at = NULL WHERE RestaurantID = $restaurantID";
                break;
            case 'bookmark_add':
                $sql = "UPDATE restaurants SET is_bookmarked = 1, bookmarked_at = '$currentTime' WHERE RestaurantID = $restaurantID";
                break;
            case 'bookmark_remove':
                $sql = "UPDATE restaurants SET is_bookmarked = NULL, bookmarked_at = NULL WHERE RestaurantID = $restaurantID";
                break;
            case 'block':
                $sql = "UPDATE restaurants SET is_blocked = 1, blocked_at = '$currentTime' WHERE RestaurantID = $restaurantID";
                break;
            case 'unblock':
                $sql = "UPDATE restaurants SET is_blocked = NULL, blocked_at = NULL WHERE RestaurantID = $restaurantID";
                break;
            case 'report':
                $sql = "UPDATE restaurants SET is_reported = 1, reported_at = '$currentTime' WHERE RestaurantID = $restaurantID";
                break;
            case 'add_to_itinerary':
                $sql = "INSERT INTO itinerary (RestaurantID, added_at) VALUES ($restaurantID, '$currentTime')";
                break;
            case 'remove_from_itinerary':
                $sql = "DELETE FROM itinerary WHERE RestaurantID = $restaurantID";
                break;
            default:
                http_response_code(400); // Bad request
                echo json_encode(['error' => 'Invalid action']);
                exit;
        }

        if ($conn->query($sql) === TRUE) {
            http_response_code(200); // Success
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500); // Internal server error
            echo json_encode(['error' => 'Failed to execute action: ' . $conn->error]);
        }
    } else {
        http_response_code(400); // Bad request
        echo json_encode(['error' => 'Invalid data']);
    }
} else {
    http_response_code(405); // Method not allowed
    echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
?>







