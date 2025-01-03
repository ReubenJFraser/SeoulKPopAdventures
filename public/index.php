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

    <!-- Button Section for Ratings -->
    <div class="button-container" id="buttonSection">
        <button class="button is-primary">
            <span class="material-symbols-outlined">star</span> TripAdvisor
        </button>
        <button class="button is-link">
            <span class="material-symbols-outlined">restaurant</span> Michelin
        </button>
    </div>

    <!-- Bulma Modal HTML Structure -->
    <?php include '../modal.php'; ?> <!-- Updated path to modal.php -->

    <!-- Dynamic Footers -->
    <footer class="footer map-mode-footer" id="mapFooter" style="display: none;">
        <!-- Content for map mode footer -->
    </footer>

    <footer class="footer regular-footer" id="regularFooter">
        <!-- Content for regular footer -->
    </footer>

    <!-- JavaScript Files -->
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
    <script type="module" src="../public/js/navbar.js" defer></script>
    <script type="module" src="../public/js/map.js" defer></script>
    <script type="module" src="../public/js/modal-navigation.js" defer></script>
    <script type="module" src="../public/js/footer.js" defer></script>
</body>
</html>














