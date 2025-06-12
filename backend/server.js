const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
// const adminRoutes = require('./routes/Admin');

connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/lost", require("./routes/lostRoutes"));
app.use("/api/found", require("./routes/foundRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/claims", require("./routes/claimRoutes"));
app.use("/api/admin", require("./routes/adminAuthRoutes"));
app.use("/api/admin/claims", require("./routes/adminClaimRoutes"));
app.use('/api/match',require('./routes/matchRoutes'));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));
app.use("/api/admin/lost", require("./routes/adminLostRoutes"));
app.use("/api/admin/found", require("./routes/adminFoundRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
// app.use('/api/admin', adminRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
