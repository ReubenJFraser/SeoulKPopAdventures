<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="../images/Vividz_Foto-AdobeStock_541624410.svg" /> <!-- Updated favicon reference -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seoul K-Pop Adventures</title>
    <link rel="stylesheet" href="../src/assets/sass/main.css"> <!-- Updated path to point to the correct main.css location -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation Bar -->
    <?php include '../navbar.php'; ?>

    <div id="app">
        <div id="map" style="width: 100%; height: 500px;"></div> <!-- Add the Map div -->
    </div>

    <!-- Bulma Modal HTML Structure -->
    <?php include '../modal.php'; ?> <!-- Updated path to modal.php -->

    <!-- Add a Section with Multiple Buttons -->
    <div class="button-container">
      <button class="button is-primary">TripAdvisor</button>
      <button class="button is-link">Michelin</button>
      <button class="button is-info">Read More</button>
    </div>

    <!-- Footer -->
    <?php include '../footer.php'; ?> <!-- Updated path to footer.php -->

    <!-- JavaScript Files -->
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
    <script type="module" src="../public/js/navbar.js" defer></script> <!-- Corrected navbar.js reference -->
    <script type="module" src="../public/js/map.js" defer></script>
    <script type="module" src="../public/js/modal-navigation.js" defer></script>
</body>
</html>













