var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

// API Routes

var baseurl = 'https://www.fanfiction.net';

app.get('/categories', function(req, res) {
	var url = baseurl;
	
	request(url, function(error, response, html) {
		if(!error){
            var $ = cheerio.load(html);
            
            var categories = [];
            
            var htmlItems = $('#gui_table1i tr td').children();
            
            $(htmlItems).each(function(i, item) {
				categories.push({
					name: $(item).text(),
					path: $(item).attr('href')
				});
            });
            
            res.json(categories);
        }
	});
});

app.get('/stories/:category/:page', function(req, res) {
	
});

app.get('/search/:string', function(req, res) {
	
});

// Run server

app.listen('8081');

console.log('FanFiction.net API (Unofficial) running on 8081');

exports = module.exports = app;
