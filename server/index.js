const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const PORT = process.env.PORT || 8080;

const app = express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send("Server up and running"));

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});