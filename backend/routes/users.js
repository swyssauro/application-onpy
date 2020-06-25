const router = require('express').Router();
let Users = require('../../models/users');
const users = require('../../models/users');

router.route('/').get((req, res) => {
    Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('error: ' + err));
});

module.exports = router;