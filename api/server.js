const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");


const server = express();

const sessionConfiguration = {
    name: "Dumbo",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: process.env.SECURE_COOKIES || false,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({})
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.listen(session(sessionConfiguration));



server.get("/", (request, response) => {
    response.status(200).json({ Frankenstein: "It's Alive", session: request.session });
});

module.exports = server;