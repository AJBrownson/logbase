require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

const { connectDB } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const customerRoutes = require("../routes/customerRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const homePageRoutes = require("../routes/homepageRoutes");
const cartRoutes = require('../routes/cartRoutes');
const reviewsRoutes = require('../routes/reviewRoutes');
const walletRoutes = require('../routes/walletRoutes');
const uploadRoutes = require('../routes/imageUploadRoutes')

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
// app.set("trust proxy", 1);

app.use(express.json({ }));
app.use(helmet());
// app.use(cors());
// app.use(cors({
//   origin: ['https://logsbase.com', 'http://localhost:3000'],
//   // credentials: true,
// }));

const allowedOrigins = ['https://logsbase.com', 'http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies (if applicable)
  })
);

app.use(logger("dev"));

//root route
app.get("/", (req, res) => {
  res.send("App works properly. Everywhere good!");
});

//this for route will need for store front, also for admin dashboard
app.use("/products/", productRoutes);
app.use("/category/", categoryRoutes);
app.use("/customer/", customerRoutes);
app.use("/order/", customerOrderRoutes);
app.use("/attributes/", attributeRoutes);
app.use("/setting/", settingRoutes);
app.use("/cart/", cartRoutes);
app.use("/reviews/", reviewsRoutes);

app.use("/homepage/", homePageRoutes);

// wallet routes
app.use("/wallet", walletRoutes);

// Cloudinary Image upload route
app.use('/images/', uploadRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use("/admin/", adminRoutes);
app.use("/orders/", orderRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
