var express = require('express');
var tweet = require('../controllers/tweetController');
var router = express.Router();

/* GET home page. */
router.get('/tweet/:query/:page', tweet.index);
router.post('/tweet', tweet.simpanTweet);
router.post('/tweet/callback', tweet.callbackAuth);

module.exports = router;
