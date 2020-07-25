require("dotenv").config(); /* Importing the dotenv package */
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// IMPORT ROUTES
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
const brainTreeRoutes = require("./routes/btPayment");

// Connecting to MongoDB database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("DB CONNECTED...");
    })
    .catch((err) => console.log("DB DIDNT CONNECT.."));

// Predefined middlewares
app.use(bodyParser.json());
app.use(cookieParser()); /* Create or Delete cookies in the user's browser */
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", brainTreeRoutes);
app.use(express.static("projfrontend/build"));

// If no API routes are hit, send the React app
app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, "projfrontend", "build", "index.html")
    );
});

// PORT
const port = process.env.PORT || 7070;

// Starting the server
app.listen(port, () => {
    console.log(`App is running at port ${port}...`);
});
