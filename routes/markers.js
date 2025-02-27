import express from 'express';
import db from '../db.js'; // Ensure db.js uses ES module syntax

const router = express.Router();

// Enable CORS for API requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 🔹 Helper Function to Fetch Restaurant Data
async function fetchRestaurantData(restaurantID = null) {
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
        FROM restaurants`;

    const params = [];
    
    if (restaurantID) {
        sql += " WHERE RestaurantID = ?";
        params.push(restaurantID);
    }

    const [results] = await db.query(sql, params);
    return results;
}

// 🔹 GET: Fetch ALL restaurants (or a specific one if `id` is provided)
router.get('/restaurants', async (req, res) => {
    try {
        const restaurantID = req.query.id ? parseInt(req.query.id) : null;
        const results = await fetchRestaurantData(restaurantID);

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

// 🔹 GET: Render Modal with Specific Restaurant Data
router.get('/modal/:id', async (req, res) => {
    try {
        const restaurantID = parseInt(req.params.id);
        if (isNaN(restaurantID)) {
            return res.status(400).json({ error: 'Invalid Restaurant ID' });
        }

        const results = await fetchRestaurantData(restaurantID);

        if (results.length > 0) {
            res.render('modal', { restaurant: results[0] }); // ✅ Render `modal.ejs` with one restaurant
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (err) {
        console.error("❌ Error fetching restaurant details:", err);
        res.status(500).send("Internal Server Error");
    }
});

// 🔹 POST: Update Restaurant Actions (like, bookmark, report)
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



