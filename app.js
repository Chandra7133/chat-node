require("./app/utils/config");
require("./app/utils/constants");
const { authCheck } = require("./app/middleware/auth");
const { connectDB } = require("./app/mongoose")
const cors = require("cors");
const express = require("express");
const app = express();
const whiteListDomains = WHITELIST_DOMAIN.split(",")
const corsOptions = {
 origin: (origin, callback) => {
  if (!origin || whiteListDomains.includes(origin)) {
   callback(null, true);
  } else {
   callback(new Error("Not allowed by CORS"));
  }
 },
 // credentials: true,
 // optionsSuccessStatus: 200,
 // methods: ["GET", "POST", "PUT", "DELETE"],
 // allowedHeaders: ["Content-Type", "Authorization"],
 // exposedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form data
// middleware
app.use(authCheck)
const router = require("./app/routers"); // Routes
app.use("/", router);
const port = process.env.PORT || 3000;
app.listen(port, async () => {
 try {
  // Await DB connection setup
  await connectDB();
  console.log(`Server is running on port ${port}`);
 } catch (err) {
  console.error("Failed to connect to DB:", err);
  process.exit(1); // Exit the app if DB connection fails
 }
});
