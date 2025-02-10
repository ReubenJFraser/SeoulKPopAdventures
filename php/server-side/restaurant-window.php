<?php
// restaurant-window.php: Dynamic Restaurant Window Component

// Check if marker data is provided via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $markerData = json_decode(file_get_contents('php://input'), true);

    if (!empty($markerData)) {
        // Extract relevant data from the provided markerData
        $restaurantNameEnglish = htmlspecialchars($markerData['RestaurantName_English'] ?? 'N/A');
        $restaurantNameKorean = htmlspecialchars($markerData['RestaurantName_Korean'] ?? '');
        $restaurantDescription = htmlspecialchars($markerData['Description'] ?? 'Description not available.');
        $restaurantAddress = htmlspecialchars($markerData['Address'] ?? 'Address not available.');
        $restaurantPhone = htmlspecialchars($markerData['Telephone'] ?? 'Contact not available.');
        $restaurantCuisine = htmlspecialchars($markerData['CuisineCategory'] ?? 'Cuisine not specified.');
        $imageURL = htmlspecialchars($markerData['ImageURL'] ?? '/public/images/placeholder.jpg');
        ?>

        <div class="restaurant-window">
            <div class="restaurant-header">
                <h2 id="restaurant-name-english"><?php echo $restaurantNameEnglish; ?></h2>
                <?php if ($restaurantNameKorean): ?>
                    <h3 id="restaurant-name-korean"><?php echo $restaurantNameKorean; ?></h3>
                <?php endif; ?>
            </div>
            <div class="restaurant-body">
                <img id="restaurant-image" src="<?php echo $imageURL; ?>" alt="Restaurant Image">
                <p id="restaurant-description"><?php echo $restaurantDescription; ?></p>
                <p id="restaurant-address">Address: <?php echo $restaurantAddress; ?></p>
                <p id="restaurant-contact">Phone: <?php echo $restaurantPhone; ?></p>
                <p id="restaurant-cuisine">Cuisine: <?php echo $restaurantCuisine; ?></p>
                <button class="read-more-button" onclick="toggleRestaurantWindow()">Read More</button>
            </div>
        </div>

        <?php
    } else {
        echo '<p>Error: No marker data provided.</p>';
    }
} else {
    echo '<p>Error: Invalid request method. Please use POST.</p>';
}
?>

