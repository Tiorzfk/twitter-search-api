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
            url: 'https://api.twitter.com/1.1/search/tweets.json?q='+req.params.query+'&geocode='+req.params.region+'&lang=in&count=100&result_type=recent',
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

            var dataTweet = {
                id_str: req.body.id_str,
                username: req.body.username,
                foto: req.body.foto,
                tgl: req.body.tgl,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                tweet: req.body.tweet,
                status: req.body.status,
                lokasi: req.body.lokasi
            }

            tweet.find({'id_str' : dataTweet.id_str}, (err,data) => {
                if(data.length == 0) {
                    var twt = new tweet(dataTweet);
                    twt.save(function(err,data) {
                        if (err) {
                            return res.json({status:400,message:err});
                        }

                        return res.json({status:200,message:'Tweet Berhasil Disimpan'});
                    });
                }else{
                    return res.json({status:400,message:'Tweet sudah di klasifikai'});
                }
            });
            
    }

    this.callbackAuthInstagram = (req,res,next) => {
        var data = {
            client_id : "b4b96d8f595b4cf3800e52df12eba67d",
            client_secret : "5c3fcb14e66d458d89435922d3bb8d82",
            redirect_uri : "http://divernity.azurewebsites.net/api/v1/tweet/callback",
            code : req.query.code,
            grant_type : "authorization_code"
        }
        var options = {
            method: 'POST',
            url: 'https://api.instagram.com/oauth/access_token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: data
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
}

module.exports = new Todo();
