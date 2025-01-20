<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./images/Vividz_Foto-AdobeStock_541624410.svg" /> <!-- Updated favicon reference -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seoul K-Pop Adventures</title>

    <!-- Main site-wide styles -->
    <link rel="stylesheet" href="/dist/css/main.css">

    <!-- Modal-specific styles -->
    <!-- <link rel="stylesheet" href="/css/styles_bulma_modal_custom.css"> -->

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation Bar -->
    <?php include '../server-side/navbar.php'; ?>

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
    <?php include '../server-side/modal.php'; ?> <!-- Updated path to modal.php -->

    <!-- Include Bottom App Bar -->
    <?php include '../server-side/bottom-app-bar.php'; ?> <!-- Added bottom app bar -->

    <!-- JavaScript Files -->
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
    <script type="module" src="./js/navbar.js" defer></script>
    <script type="module" src="./js/map.js" defer></script>
    <script type="module" src="./js/modal-navigation.js" defer></script>
    <script type="module" src="./js/bottom-app-bar.js" defer></script>
    <script type="module" src="./js/restaurant-window.js" defer></script> <!-- Added restaurant-window.js -->
</body>
</html>
















