const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 11); // hash password
    const newUser = {
      username: user.username,
      password: hash
    };

   Users.add(newUser)
    .then(savedUser => {
        console.log(savedUser);
        res.status(201).json(savedUser);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
						// verify password
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                });
            } else {
                res.status(401).json({
                    message: 'Invalid login details'
                })
            }
        })
        .catch(error => {
            res.status(500).json(error);
    })
});

module.exports = router;