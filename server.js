import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable JSON body parsing for API requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Explicitly use EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Serve `/images/` directly from `public/`
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ Serve `public/` as a base directory for static files
app.use('/seoul-kpop-adventures', express.static(path.join(__dirname, 'public')));

// ✅ Serve JS, CSS, and image files properly
app.use('/seoul-kpop-adventures/js', express.static(path.join(__dirname, 'public/js')));
app.use('/seoul-kpop-adventures/css', express.static(path.join(__dirname, 'public/css')));
app.use('/seoul-kpop-adventures/images', express.static(path.join(__dirname, 'public/images')));
app.use('/seoul-kpop-adventures/icons', express.static(path.join(__dirname, 'public/images/icons')));
app.use('/seoul-kpop-adventures/icons/google_material', express.static(path.join(__dirname, 'public/images/icons/google_material')));
app.use('/seoul-kpop-adventures/icons/adobe_stock', express.static(path.join(__dirname, 'public/images/icons/adobe_stock')));
app.use('/seoul-kpop-adventures/restaurants', express.static(path.join(__dirname, 'public/images/restaurants')));

// ✅ Serve compiled assets from `dist/`
app.use('/seoul-kpop-adventures/dist/css', express.static(path.join(__dirname, 'dist/css')));
app.use('/seoul-kpop-adventures/dist/js', express.static(path.join(__dirname, 'dist'))); // Ensures compiled JS (index.js)

// ✅ Log static file requests for debugging
app.use((req, res, next) => {
    console.log(`Serving request: ${req.url}`);
    next();
});

// API Routes
import markersRoutes from './routes/markers.js';
app.use('/seoul-kpop-adventures/api', markersRoutes);

// Homepage Route
app.get('/seoul-kpop-adventures/map', (req, res) => {
    res.render('index', { title: 'Seoul K-Pop Adventures' });
});

// ✅ Debugging Route (Remove after testing)
app.get('/test-file', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/js/bottom-app-bar.js'));
});

// Handle 404 errors
app.use((req, res, next) => {
    console.log(`404 Error - File Not Found: ${req.url}`);
    res.status(404).send("404 - Page Not Found");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}/seoul-kpop-adventures/map`));
