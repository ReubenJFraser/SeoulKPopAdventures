<!-- Updated bulma_modal_card_test.php: PHP Converted File with Includes for Modular Components -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/images/AdobeStock_296116662-Korean_Flag_Optimized.svg"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modal Test - Bulma Integration</title>
    <link rel="stylesheet" href="/src/assets/sass/main.css"> <!-- Updated stylesheet link -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link rel="stylesheet" href="/dist/css/styles_bulma_modal_custom.css"> <!-- Updated stylesheet link -->
</head>
<body>
    <!-- Include the Centralized Navigation Bar -->
    <?php include 'navbar.php'; ?>
    
    <!-- Button to Open the Modal -->
    <button class="button is-primary" id="openModal">Open Modal Popup</button>

    <!-- Modal Card -->
    <?php include 'modal.php'; ?>

    <!-- Footer -->
    <?php include 'footer.php'; ?>

    <!-- JavaScript Files -->
    <script src="/public/js/navbar.js" defer></script> <!-- Corrected navbar.js path -->
</body>
</html>







