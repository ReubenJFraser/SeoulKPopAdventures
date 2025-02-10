import express from 'express';
import db from '../db.js'; // Ensure db.js also uses ES module syntax

const router = express.Router();

// Enable CORS for API requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 🔹 GET: Fetch ALL restaurant data
router.get('/restaurants', async (req, res) => {
    try {
        let sql = `
            SELECT 
                RestaurantID, 
                RestaurantName_English, 
                RestaurantName_Korean,
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
                TripAdvisor_PriceCategory,
                PriceCategory,
                PriceRangeIcon,
                PriceRangeTooltip,
                ImageURL,
                Icons,
                AdditionalInfo,
                TripAdvisorReviews,      -- ✅ Newly Added
                MichelinGuideReviews,    -- ✅ Newly Added
                GoogleMapsReviews,       -- ✅ Newly Added
                AIReviewSummary,         -- ✅ Newly Added
                is_liked,
                liked_at,
                is_bookmarked,
                bookmarked_at,
                is_blocked,
                blocked_at,
                is_reported,
                reported_at
            FROM restaurants
        `;

        // Apply filters (id or markerType)
        const conditions = [];
        const params = [];

        if (req.query.id) {
            conditions.push("RestaurantID = ?");
            params.push(parseInt(req.query.id));
        }
        if (req.query.markerType) {
            conditions.push("MarkerType = ?");
            params.push(req.query.markerType);
        }

        if (conditions.length) {
            sql += " WHERE " + conditions.join(" AND ");
        }

        const [results] = await db.query(sql, params);

        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ message: 'No records found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 🔹 GET: Fetch SPECIFIC restaurant by ID (Merged from restaurant.js)
router.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurantID = parseInt(req.params.id);
        if (isNaN(restaurantID)) {
            return res.status(400).json({ error: 'Invalid Restaurant ID' });
        }

        // Fetch restaurant details from the database
        const sql = `
            SELECT 
                RestaurantID, 
                RestaurantName_English, 
                RestaurantName_Korean,
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
                TripAdvisor_PriceCategory,
                PriceCategory,
                PriceRangeIcon,
                PriceRangeTooltip,
                ImageURL,
                Icons,
                AdditionalInfo,
                TripAdvisorReviews,      -- ✅ Newly Added
                MichelinGuideReviews,    -- ✅ Newly Added
                GoogleMapsReviews,       -- ✅ Newly Added
                AIReviewSummary,         -- ✅ Newly Added
                is_liked,
                liked_at,
                is_bookmarked,
                bookmarked_at,
                is_blocked,
                blocked_at,
                is_reported,
                reported_at
            FROM restaurants 
            WHERE RestaurantID = ?`;

        const [results] = await db.query(sql, [restaurantID]);

        if (results.length > 0) {
            // Convert database fields to correct types (e.g., float for coordinates)
            const restaurant = results[0];
            restaurant.Latitude = parseFloat(restaurant.Latitude);
            restaurant.Longitude = parseFloat(restaurant.Longitude);
            
            res.json(restaurant);
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (err) {
        console.error('Error fetching restaurant details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 🔹 POST: Update restaurant actions (like, bookmark, report)
router.post('/restaurants/action', async (req, res) => {
    try {
        const { RestaurantID, action } = req.body;
        if (!RestaurantID || !action) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        let sql;
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        switch (action) {
            case 'like':
                sql = "UPDATE restaurants SET is_liked = 1, liked_at = ? WHERE RestaurantID = ?";
                break;
            case 'unlike':
                sql = "UPDATE restaurants SET is_liked = NULL, liked_at = NULL WHERE RestaurantID = ?";
                break;
            case 'bookmark_add':
                sql = "UPDATE restaurants SET is_bookmarked = 1, bookmarked_at = ? WHERE RestaurantID = ?";
                break;
            case 'bookmark_remove':
                sql = "UPDATE restaurants SET is_bookmarked = NULL, bookmarked_at = NULL WHERE RestaurantID = ?";
                break;
            case 'block':
                sql = "UPDATE restaurants SET is_blocked = 1, blocked_at = ? WHERE RestaurantID = ?";
                break;
            case 'unblock':
                sql = "UPDATE restaurants SET is_blocked = NULL, blocked_at = NULL WHERE RestaurantID = ?";
                break;
            case 'report':
                sql = "UPDATE restaurants SET is_reported = 1, reported_at = ? WHERE RestaurantID = ?";
                break;
            case 'add_to_itinerary':
                sql = "INSERT INTO itinerary (RestaurantID, added_at) VALUES (?, ?)";
                break;
            case 'remove_from_itinerary':
                sql = "DELETE FROM itinerary WHERE RestaurantID = ?";
                break;
            default:
                return res.status(400).json({ error: 'Invalid action' });
        }

        await db.query(sql, action.includes('add') || action.includes('like') ? [currentTime, RestaurantID] : [RestaurantID]);
        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to execute action' });
    }
});

// Export router as an ES module
export default router;


