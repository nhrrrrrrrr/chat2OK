import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import csurf from "csurf";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// import csurf from "csurf";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
dotenv.config({});

const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// CSRF protection middleware
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() }); //这里会为每一个请求自动生成一个随机不同的token值
});
// Serve static files from the 'public' directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// API routes
// app.get("/api", (req, res) => {
//   res.json({ message: "hello" });
// });
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
