var express = require('express');
var router = express.Router();
const api = require('../controllers/api')


router.get('/api/getUserInfo', api.getUserInfo)


module.exports = router;