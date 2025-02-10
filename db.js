import mysql from 'mysql2/promise';

// Create a connection pool to handle multiple requests efficiently
const db = mysql.createPool({
    host: 'localhost',    // Your database server
    user: 'root',         // Your MySQL username (default is 'root' for local)
    password: '',         // Your MySQL password (empty by default on localhost)
    database: 'mapmarkers', // Name of your database
    waitForConnections: true,
    connectionLimit: 10,   // Adjust as needed
    queueLimit: 0
});

export default db;
