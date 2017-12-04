var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//elasticsearch

var client = new elasticsearch.client({
	accesskeyId:'AKIAJNJVNJIDD4PAVDSQ'
	secretAccessKey:'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'
	service: 'es',
	region: 'us-east-2',
	host:'search-onmovies-acos3mekrcpjgypkx5amt6mkra.us-east-2.es.amazonaws.com'
});

router.get('/search',function(req,response,next){
    var pageNum = 1;
    var perPage = 6;
    console.log("Hello there");
    var userQuery = req.query['query'];
    console.log(userQuery);
    var searchParams = {
        index: 'onmovies',
        from: (pageNum - 1) * perPage,
        size: perPage,
        type: 'movies',
        body: {
            query: {
                multi_match: {
               //match: { "model": userQuery }
                    fields:  ["movie_name"],
                    query:     userQuery,
                    fuzziness: "AUTO"
                }
            }
        }
};


    client.search(searchParams, function (err, res) {
        if (err) {
            // handle error
            throw err;
        }
        //console.log(res);
       var results = res.hits.hits.map(function(i){
            return i['_source'];
        });
      //  console.log("****" +results);
        var productChunks = [];
        var chunkSize = 3;
        for(var i = 0;i<results.length;i+=chunkSize){
            productChunks.push(results.slice(i,i+chunkSize));
            //console.log(productChunks);
            //console.log("reached productchunks")
        }

        response.render('index', {title: 'onmovies',
            products: productChunks
        });
    });
});


// redis
var redis = require('redis');

var redisclient = redis.createClient(6379,rediscluster.xt7pjf.0001.use2.cache.amazonaws.com);

//var redisclient = redis.createClient();
redisclient.auth('password', function (err) {
    if (err) throw err;
});

redisclient.on('connect', function() {
    console.log('Connected to Redis');
});



/* GET home page. */
router.get('/', function(req, res, next) {

    redisclient.get("Recommended",function(err,result){
        var c1 = [];
        var chunkSize =4;
        var obj1 = JSON.parse(result.replace(/'/g, '"'));

        for(var i=0;i<obj1.length;i+=chunkSize){
            if(i==0)
                c1.push(obj1.slice(i,i+chunkSize));
            
            //console.log(productChunks);
        }
        redisclient.get("PopularThisWeek",function(err,result){
            var t1 = [];
            var chunkSize =4;
            var obj2 = JSON.parse(result.replace(/'/g, '"'));

            for(var i=0;i<obj2.length;i+=chunkSize){
                if(i==0)
                    t1.push(obj2.slice(i,i+chunkSize));
                
                //console.log(productChunks);
            }
            

                
                res.render('shop/indexMain', { title: 'Best Movies'
                    , c1: c1, t1: t1, csrfToken: req.csrfToken()});

                //redisclient.quit();
            });
        });
    });
});
module.exports = router;
