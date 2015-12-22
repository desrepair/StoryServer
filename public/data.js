function ajaxCall(type, endpoint, body, callback) {
    $.ajax({
        url: 'http://desrepair.cloudapp.net:3000/' + endpoint,
        type: type,
        data: body,
    }).done(function(data) {
        callback(data);
    }).fail(function() {
        console.log('Death Again...');
        callback(null);
    });
}

function populateAllNewsSubjects() {
    ajaxCall('GET', 'newsSubjects', null,  function(data) {
        console.log(data);
        document.getElementById("allnewsb1").textContent=data.subjects[0];
        document.getElementById("allnewsb2").textContent=data.subjects[1];
        document.getElementById("allnewsb3").textContent=data.subjects[2];
        document.getElementById("allnewsb4").textContent=data.subjects[3];
        document.getElementById("allnewsb5").textContent=data.subjects[4];
        getTopStories(data.subjects[0]);
    });
}

function populateReliableNewsSubjects() {
    ajaxCall('GET', 'seriousNewsSubjects', null, function(data) {
        console.log(data);
        document.getElementById("topnewsb1").textContent=data.subjects[0];
        document.getElementById("topnewsb2").textContent=data.subjects[1];
        document.getElementById("topnewsb3").textContent=data.subjects[2];
        document.getElementById("topnewsb4").textContent=data.subjects[3];
        document.getElementById("topnewsb5").textContent=data.subjects[4];
        getTopSeriousStories(data.subjects[0]);
    });
}

function populateAllTweetSubjects() {
    ajaxCall('GET', 'tweetSubjects', null, function(data) {
        console.log(data);
        document.getElementById("twitterb1").textContent=data.subjects[0];
        document.getElementById("twitterb2").textContent=data.subjects[1];
        document.getElementById("twitterb3").textContent=data.subjects[2];
        document.getElementById("twitterb4").textContent=data.subjects[3];
        document.getElementById("twitterb5").textContent=data.subjects[4];
        getTopTweets(data.subjects[0]);
    });
}

function populateNewsTweetSubjects() {
    ajaxCall('GET', 'newsTweetSubjects', null, function(data) {
        console.log(data);
        document.getElementById("toptwitterb1").textContent=data.subjects[0];
        document.getElementById("toptwitterb2").textContent=data.subjects[1];
        document.getElementById("toptwitterb3").textContent=data.subjects[2];
        document.getElementById("toptwitterb4").textContent=data.subjects[3];
        document.getElementById("toptwitterb5").textContent=data.subjects[4];
        getTopNewsTweets(data.subjects[0]);
    });
}

function populateAllSubjects() {
    populateAllNewsSubjects();
    populateReliableNewsSubjects();
    populateAllTweetSubjects();
    populateNewsTweetSubjects();
}

function getTopStories(subject) {
    var body = {};
    body.subject = subject;
    ajaxCall('POST', 'topStories', body, function(data) {
        console.log(data);
        var articleList = '';
        for (var i = 0; i < 10 && i < data.results.length; i++) {
            var title = data.results[i].Title;
            var storyURL = data.results[i].URL;
            var articleEntry = articleEntry + '<p> <a href= ' + storyURL + '>' + title + '</a></p>';
        }
        document.getElementById("panel1").innerHTML=articleEntry;
    });
}

function getTopSeriousStories(subject) {
    var body = {};
    body.subject = subject;
    ajaxCall('POST', 'topSeriousStories', body, function(data) {
        console.log(data);
        var articleList = '';
        for (var i = 0; i < 10 && i < data.results.length; i++) {
            var title = data.results[i].Title;
            var storyURL = data.results[i].URL;
            var articleEntry = articleEntry + '<p> <a href= ' + storyURL + '>' + title + '</a></p>';
        }
        document.getElementById("panel2").innerHTML=articleEntry;
    });
}

function getTopTweets(subject) {
    var body = {};
    body.subject = subject;
    ajaxCall('POST', 'topTweets', body, function(data) {
        console.log(data);
        var articleList = '';
        for (var i = 0; i < 10 && i < data.results.length; i++) {
            var title = data.results[i].Tweet;
            var articleEntry = articleEntry + '<p>' + title + '</p>';
        }
        document.getElementById("panel3").innerHTML=articleEntry;
    });
}

function getTopNewsTweets(subject) {
    var body = {};
    body.subject = subject;
    ajaxCall('POST', 'topNewsTweets', body, function(data) {
        console.log(data);
        var articleList = '';
        for (var i = 0; i < 10 && i < data.results.length; i++) {
            var title = data.results[i].Tweet;
            var articleEntry = articleEntry + '<p>' + title + '</p>';
        }
        document.getElementById("panel4").innerHTML=articleEntry;
    });
}

$(document).ready(function() {
    console.log('I am ready!');
    populateAllSubjects();
    getTopStories('Cancer');
    getTopSeriousStories('President of the United States');
});
