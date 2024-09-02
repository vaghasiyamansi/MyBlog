
require("dotenv").config()
const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const ports = process.env.PORTS;
const server = express();

// View Engine configuration
server.set("view engine", "ejs");

// in-built middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.get("/", (req, res) => {
    res.render('login.ejs');
});

// User routes
const userRoutes = require("./routes/user.routes");
const blogRoutes= require("./routes/blog.routes");

server.use("/api/users", userRoutes);
server.use("/api/blog", blogRoutes);

server.listen(ports, () => {
    // Database connection
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log(`Database connected`))
        .catch(err => console.log(err))
    console.log(`server start http://localhost:${ports}`);
})
