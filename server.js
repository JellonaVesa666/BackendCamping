const express = require("express"); // Declare express
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
var cors = require('cors')
require("dotenv").config();

// App
const app = express(); // Store epxress into app variable

// Import Routes
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const cabinRoutes = require("./routes/cabinRoutes")
const cabinListRoutes = require("./routes/cabinListRoutes")

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes middleWare
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cabinRoutes);
app.use("/api", cabinListRoutes);

// Database Connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to database"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})