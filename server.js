var mysql = require('mysql');
var util = require('util');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var conn = mysql.createConnection({ // stories DB
    host     : 'ajz2120stories.cz6woaizkeyb.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'topstory',
    password : 'topstory',
    database : 'stories'
});

var connTweets = mysql.createConnection({ // general tweets DB
    host     : 'projectdb.cgoq09tt4tlc.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'venciya',
    password : 'venciyam',
    database : 'TweetMap'
});

var connNewsTweets = mysql.createConnection ({ // news tweets DB
    host     : 'filtertweetmap.cgoq09tt4tlc.us-west-2.rds.amazonaws.com',
    port     : '3307',
    user     : 'awsvenciya',
    password : 'awsvenciya1',
    database : 'TweetMapFilter'
});

app.listen(3000);
console.log('Express started on port 3000.');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// return top 5 news subjects from all sources
app.get('/newsSubjects', function(req, res) {
    conn.query('SELECT * FROM TopSubjects', function(err, rows, fields) {
        var subjects = [];
        if (err) {
            console.log(err);
        } else {
            for (var i in rows) {
                subjects.push(rows[i].Subject);
                if (i === '4') {
                    res.json({subjects: subjects});
                }
            }
        }
    });
});

// return stories from all sources matching subject provided in request body
app.post('/topStories', function(req, res) {
    var sqlResults = 'SELECT * FROM TopStories WHERE Subjects LIKE \'%' + req.body.subject  + '%\';';
    conn.query(sqlResults, function(err, rows, fields) {
        var stories = [];
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < rows.length; i++) {
                stories.push(rows[i]);
                if (i === rows.length - 1) {
                    res.json({results: stories});
                }
            }
        }
    });
});

// return top 5 news subjects from NYT and Guardian
app.get('/seriousNewsSubjects', function(req, res) {
    conn.query('SELECT * FROM TopSeriousSubjects', function(err, rows, fields) {
        var subjects = [];
        if (err) {
            console.log(err);
        } else {
            for (var i in rows) {
                subjects.push(rows[i].Subject);
                if (i === '4') {
                    res.json({subjects: subjects});
                }
            }
        }
    });
});

// return stories from NYT and Guardian matching subject provided in request body
app.post('/topSeriousStories', function(req, res) {
    var sqlResults = 'SELECT * FROM TopStories WHERE Subjects LIKE \'%' + req.body.subject  + '%\'; AND Source in (\'NYT\',\'Guardian\')';
    conn.query(sqlResults, function(err, rows, fields) {
        var stories = [];
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < rows.length; i++) {
                stories.push(rows[i]);
                if (i === rows.length - 1) {
                    res.json({results: stories});
                }
            }
        }
    });
});

// return top 5 tweet subjects from unfiltered tweet stream
app.get('/tweetSubjects', function(req, res) {
    var subjects = {};
    var topSubjects = [];

    connTweets.query('SELECT * FROM Tweets ORDER BY Timestamp DESC LIMIT 20000', function(err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        for (var i in rows) {
          var tagField = rows[i].Hashtag;
          var tags = tagField.split(' ');
          tags.pop();
          for (var tag in tags) {
            //console.log(tags[tag]);
            var subject = tags[tag];
            // discard foreign language characters
            if (subject.search(/\?\?+/) === -1)
            {
              if (subjects[subject] === undefined && subject !== '') {
                subjects[subject] = 1;
              } else if (subject !== '') {
                subjects[subject]++;
              }
            }
          }
        }
        //console.log(subjects);
        var keysSorted = Object.keys(subjects).sort(function(a,b) {return -(subjects[a] - subjects[b])});
        //console.log(keysSorted);
        for (var i = 0; i < 5 && i < keysSorted.length; i++) {
          topSubjects.push(keysSorted[i]);
          if (i === 4) {
              res.json({subjects: topSubjects});
          }
        }
      }
    });
})

// return up to 50 sample tweets from unfiltered tweet stream matching subject provided in request body
app.post('/topTweets', function(req, res) {
    var sqlResults = 'SELECT * FROM Tweets WHERE Hashtag LIKE \'%' + req.body.subject  + '%\' ORDER BY Timestamp DESC LIMIT 50';
    connTweets.query(sqlResults, function(err, rows, fields) {
        var tweets = [];
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < rows.length; i++) {
                tweets.push(rows[i]);
                if (i === rows.length - 1) {
                    res.json({results: tweets});
                }
            }
        }
    });
});

// return top 5 tweet subjects from news filtered tweet stream
app.get('/newsTweetSubjects', function(req, res) {
    var subjects = {};
    var topSubjects = [];

    connNewsTweets.query('SELECT * FROM Tweets ORDER BY Timestamp DESC LIMIT 20000', function(err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        for (var i in rows) {
          var tagField = rows[i].Hashtag;
          var tags = tagField.split(' ');
          tags.pop();
          for (var tag in tags) {
            //console.log(tags[tag]);
            var subject = tags[tag];
            // discard foreign language characters
            if (subject.search(/\?\?+/) === -1)
            {
              if (subjects[subject] === undefined && subject !== '') {
                subjects[subject] = 1;
              } else if (subject !== '') {
                subjects[subject]++;
              }
            }
          }
        }
        //console.log(subjects);
        var keysSorted = Object.keys(subjects).sort(function(a,b) {return -(subjects[a] - subjects[b])});
        //console.log(keysSorted);
        for (var i = 0; i < 5 && i < keysSorted.length; i++) {
          topSubjects.push(keysSorted[i]);
          if (i === 4) {
              res.json({subjects: topSubjects});
          }
        }
      }
    });
})

// return up to 50 sample tweets from news filtered tweet stream matching subject provided in request body
app.post('/topNewsTweets', function(req, res) {
    var sqlResults = 'SELECT * FROM Tweets WHERE Hashtag LIKE \'%' + req.body.subject  + '%\' ORDER BY Timestamp DESC LIMIT 50';
    connNewsTweets.query(sqlResults, function(err, rows, fields) {
        var tweets = [];
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < rows.length; i++) {
                tweets.push(rows[i]);
                if (i === rows.length - 1) {
                    res.json({results: tweets});
                }
            }
        }
    });
});
