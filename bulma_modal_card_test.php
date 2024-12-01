<!-- bulma_modal_card_test.php: PHP Converted File with Includes for Modular Components -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/images/Vividz_Foto-AdobeStock_541624410.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modal Test - Bulma Integration</title>
    <link rel="stylesheet" href="/src/assets/sass/main.css"> <!-- Updated to link compiled CSS -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link rel="stylesheet" href="/src/assets/sass/styles_bulma_modal_custom.css"> <!-- Updated stylesheet link -->
</head>
<body>
    <!-- Button to Open the Modal -->
    <button class="button is-primary" id="openModal">Open Modal Popup</button>

    <!-- Modal Card -->
    <?php include 'modal.php'; ?>

    <!-- Footer -->
    <?php include 'footer.php'; ?>

    <!-- JavaScript Files -->
    <script src="/src/assets/js/main.js" defer></script> <!-- Removed Vite reference and added normal script reference -->
    <script src="/src/assets/js/modal-navigation.js" defer></script>
    <script src="/src/assets/js/map.js" defer></script>
</body>
</html>





