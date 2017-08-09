var express = require('express');
var tweet = require('../controllers/tweetController');
var router = express.Router();

/* GET home page. */
router.get('/tweet/:query/:region', tweet.index);
router.post('/tweet', tweet.simpanTweet);
router.get('/tweet/callback', tweet.callbackAuthInstagram);

module.exports = router;
