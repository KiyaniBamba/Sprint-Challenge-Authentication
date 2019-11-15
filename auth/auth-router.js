const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
                const token = generateToken(user);
                res.status(200).json({
                  message: `Welcome ${user.username}!, have a token...`,
                  token,
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

function generateToken(user) {
  const payload = {
    subject: user.id, 
    username: user.username,
    password: user.password
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };
  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;