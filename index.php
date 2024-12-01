<!-- index.php: Updated PHP File with JavaScript References for Modular Components -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/images/Vividz_Foto-AdobeStock_541624410.svg" /> <!-- Updated favicon reference -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modal Test - Bulma Integration</title>
    <link rel="stylesheet" href="/src/assets/sass/main.css"> <!-- Updated to link compiled CSS -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap">
</head>
<body>
    <!-- Navigation Bar -->
    <?php include 'navbar.php'; ?>

    <!-- Existing Button -->
    <button class="button is-small is-primary is-dark">Button</button>

    <!-- Add a Popup -->
    <div class="popup">
      <div class="popup-header">Popup Title</div>
      <div class="popup-buttons">
        <button class="button is-primary">Primary Action</button>
        <button class="button is-light">Secondary Action</button>
      </div>
    </div>

    <!-- Add a Section with Multiple Buttons -->
    <div class="button-container">
      <button class="button is-primary">TripAdvisor</button>
      <button class="button is-link">Michelin</button>
      <button class="button is-info">Read More</button>
    </div>

    <!-- Footer -->
    <?php include 'footer.php'; ?>

    <!-- JavaScript Files -->
    <script src="/src/assets/js/main.js" defer></script> <!-- Removed Vite reference and added normal script reference -->
    <script src="/src/assets/js/modal-navigation.js" defer></script>
    <script src="/src/assets/js/map.js" defer></script>
</body>
</html>







