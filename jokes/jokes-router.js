const axios = require('axios');

const router = require('express').Router();
const restricted = require("../auth/authenticate-middleware");

router.get('/', restricted, (req, res) => {
  if (req.decodedToken) {
    const requestOptions = {
      headers: { accept: 'application/json' },
    };
  
    axios
      .get('https://icanhazdadjoke.com/search', requestOptions)
      .then(response => {
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error Fetching Jokes', error: err });
      })
     } else {
        res.json({
          message: "You don't have the right to access this information"
        });
      }
    });

module.exports = router;
