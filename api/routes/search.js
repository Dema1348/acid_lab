const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search')
const searchCache= require('../middleware/searchCache')



router.get('/', searchCache.getSearch ,searchController.getSearch);

module.exports = router;

