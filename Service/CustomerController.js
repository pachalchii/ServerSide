const express = require('express');
const bodyParser = require('body-parser');
const { Seller } = require('./../sequelize');

const myVars = require('./../Util/myVars');
var router = express.Router();

// sign up
router.post('/register', (req, res) => {
    Seller.create(req.body)
        .then(user => res.json(user))
});

module.exports = router;

