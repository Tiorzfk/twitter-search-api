var express = require('express');
var tweet = require('../controllers/tweetController');
var router = express.Router();

/* GET home page. */
router.get('/tweet/:query', tweet.index);
router.post('/tweet', tweet.simpanTweet);

module.exports = router;
