const express = require('express')
const bodyParser = require('body-parser')
const {Seller} = require('./sequelize')
const myVars = require('./Util/myVars')

const app = express()
app.use(bodyParser.json())




// create a user
app.post('/api/users', (req, res) => {

    Seller.create(req.body)
        .then(user => res.json(user))
});



// get all users
app.get('/api/users', (req, res) => {
    Seller.findAll().then(users => res.json(users))
});




const port = 7070;
app.listen(port, () => {
    console.log( myVars.colors.bg.Green ,  'Node Server listening on port ~~> ' ,myVars.colors.Reset , myVars.colors.fg.Blue + port ,  myVars.colors.Reset);
});