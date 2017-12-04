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

module.exports = router;
