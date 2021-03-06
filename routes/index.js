var express = require('express');
var React = require('react');
var jsx = require('node-jsx');
var data = require('../data');
jsx.install();
 
var router = express.Router();
var Layout = require('../views/layout.jsx');

router.get('/', function(req, res) {
     
    var initialData = data.list;  
    
    res.setHeader('Content-Type', 'text/html');
    res.end(React.renderToStaticMarkup(React.createElement(Layout, { 
        scripts: ['/index.js'],
        styles: ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css']
    })));
});

router.post('/list', function(req, res) {
    res.json(data.list); 
});

router.post('/new', function(req, res) {
    if(req.body.text) {
        data.add(req.body.text, false);
    }
    res.json(data.list); 
});

router.post('/change', function(req, res) {
    if(req.body.text) {
        var item = data.change(req.body.text, req.body.done);
        res.json(item);
    } else {
        res.end();
    }
});

router.post('/delete', function(req, res) {
    data.delete(req.body.text);
    res.end();
});

module.exports = router; 