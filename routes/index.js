var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/friend', function(req, res, next) {
  res.render('friend');
});

router.get('/board', function(req, res, next) {
  res.render('board');
});

router.get('/grade', function(req, res, next) {
  res.render('grade');
});

router.get('/timetable', function(req, res, next) {
  res.render('timetable');
});

router.get('/setting', function(req, res, next) {
  res.render('setting');
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/signout', function(req, res, next) {
  res.render('signout');
});

router.get('/board/:id', function(req, res, next) {
  res.render('board', {
    boardId : (req.params.id) ? req.params.id : 0,
    p : req.query.p,
    c : req.query.c
  });
});

router.get('\/\@([^\/]+)\/?', function(req, res, next) {
  res.render('friend', { username : req.params[0] } );
});

module.exports = router;