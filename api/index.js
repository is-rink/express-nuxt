const express = require('express');
const router = express.Router();
const users = require('./routes/users');

router.use(express.json());
router.use('/users', users);

module.exports = router;
