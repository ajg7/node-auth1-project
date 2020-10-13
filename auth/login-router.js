const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const Users = require("../routers/login-model");

router.post("/register", (request, response) => {
    const credentials = request.body;
    const rounds = Number(process.env.HASH_ROUNDS) || 6;
    credentials.password = hash;
    Users.add(credentials)
        .then(user => {
            response.status(201).json({ data: user })
        })
        .catch(err => response.json({ message: err.message }))
})

router.post("/login", (request, response) => {
    const credentials = request.body;

    Users.findBy({ username: credentials.username })
        .then(users => {
            const user = users[0]

            if(user && bcryptjs.compareSync(credentials.password, user.password)) {
                request.username = user.username;
                response.status(200).json({
                    message: "welcome",
                    username: request.username,
                })
            } else {
                response.status(401).json({ message: "invalid characters" })
            }
            response.status(201).json({ data: user })
        })
        .catch(error => response.json({ message: error.message }))
})

router.get("/logout", (request, response) => {
    if(request.session) {
        request.session.destroy(error => {
            if(error) {
                response.status(500).json({ message: "logout failed, please try later" })
            } else {
                response.status(204).end();
            }
        });
    } else {
        res.status(204).end();
    }
})

module.exports = router;