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
    database : 'stories',
});

var connTweets = mysql.createConnection({ // general tweets DB
  host     : 'projectdb.cgoq09tt4tlc.us-west-2.rds.amazonaws.com',
  port     : '3306',
  user     : 'venciya',
  password : 'venciyam',
  database : 'TweetMap',
});

var newsSubjects = {};
newsSubjects.subjects = [];

app.listen(3000);
console.log('Express started on port 3000.');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

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

/*var getTopSubjects = function() {
    var subjects = [];
    conn.query('SELECT * FROM TopSubjects', function(err, rows, fields) {
        // Catch error in querying subjects
        if(err) {
            console.log(err);
        } else {
            console.log("Top News Subjects");
            console.log("-----------------");
            for (var i in rows) {
                console.log(rows[i].Subject);
                subject
                subcount++;
                if (subcount === 5) {
                    logTwitterTrends();
                }
            }
        }
    });
}

var logTwitterTrends = function () {
    var connTweets = mysql.createConnection({
        host     : 'projectdb.cgoq09tt4tlc.us-west-2.rds.amazonaws.com',
        port     : '3306',
        user     : 'venciya',
        password : 'venciyam',
        database : 'TweetMap',
    });

    var subjects = {};

    connTweets.query('SELECT * FROM Tweets ORDER BY Timestamp DESC LIMIT 20000', function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log('\n\nTop Twitter Hashtags');
            console.log('-----------------');
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
                console.log(keysSorted[i]);
            }
        }
    });
}
*/
