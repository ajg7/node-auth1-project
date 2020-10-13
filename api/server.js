const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const server = express();
const protected = require("../auth/protected-mw");

const UsersRouter = require("../routers/user-router")
const AuthRouter = require("../auth/login-router");



const sessionConfiguration = {
    name: "Dumbo",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: process.env.SECURE_COOKIES || false,
    },
    resave: false,
    saveUninitialized: true
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));
server.use("/users", protected, UsersRouter);
server.use("/auth", protected, UsersRouter);


server.get("/", (request, response) => {
    response.status(200).json({ Frankenstein: "It's Alive", session: request.session });
});

module.exports = server;