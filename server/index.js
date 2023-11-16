const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const connectDB = require('./config/db');

const PORT = process.env.PORT || 8080;

const app = express();
connectDB();

app.use(
    cors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );
  
app.use(express.json({ extended: false }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/',require('./routes/index_router'));

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});