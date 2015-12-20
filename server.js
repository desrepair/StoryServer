var mysql = require('mysql');
var util = require('util');
var express = require('express');
var app = express();
var conn = mysql.createConnection({
    host     : 'ajz2120stories.cz6woaizkeyb.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'topstory',
    password : 'topstory',
    database : 'stories',
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

app.get('/topStories', function(req, res) {
    conn.query('SELECT * FROM TopStories', function(err, rows, fields) {
        var stories = [];
        if (err) {
            console.log(err);
        } else {
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
