var https = require('https');
var request = require('request');
var tweet = require('mongoose').model('Tweet');

function Todo () 
{
    this.index = (req,res,next) => {

        // const options = {
        //     hostname: 'api.twitter.com',
        //     path: '/1.1/search/tweets.json?q=unikom&lang=in&count=6',
        //     headers: {
        //         'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAEf51gAAAAAAglFlYzIXrKkKR4UoxwfZbxNaG1w%3DqO6bKJALKppXZZmOIPmncQtVBq521Rx8imjaVMKFOtZzzeZVRZ'
        //     },
        //     method: 'GET'
        // }

        // https.request(options, (response) => {
        //     var body = '';
        //     response.on('data', function(d) {
        //         body += d;
        //     });
        //     response.on('end', function() {
        //         var parsed = JSON.parse(body);
        //         return res.json(parsed);
        //     });
        // });

        var options = {
            method: 'GET',
            url: 'https://api.twitter.com/1.1/search/tweets.json?q='+req.params.query+'&lang=in&count='+req.params.page+'',
            headers: {
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAEf51gAAAAAAglFlYzIXrKkKR4UoxwfZbxNaG1w%3DqO6bKJALKppXZZmOIPmncQtVBq521Rx8imjaVMKFOtZzzeZVRZ',
                'Content-Type': 'application/json'
            },
        };
        function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            return res.json(info);
        }
        if(error)
            console.log(error);
        }

        request(options, callback);

    }

    this.simpanTweet = (req,res,next) => {

            var data = {
                id: req.body.id_str,
                username: req.body.username,
                foto: req.body.foto,
                tgl: req.body.tgl,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                tweet: req.body.tweet,
                status: req.body.status
            }

            console.log(data);

            var twt = new tweet(data);
            twt.save(function(err,data) {
            if (err) {
                    return res.json({status:400,message:err});
                }

            return res.json({status:200,message:'Success insert data'});
            });
    }

    this.callbackAuth = (req,res,next) => {
        return res.json(req.query);
    }
}

module.exports = new Todo();