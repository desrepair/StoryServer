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
        document.getElementbyId("allnewsb1").value=data.subject[0];
        document.getElementbyId("allnewsb2").value=data.subject[1];
        document.getElementbyId("allnewsb3").value=data.subject[2];
        document.getElementbyId("allnewsb4").value=data.subject[3];
        document.getElementbyId("allnewsb5").value=data.subject[4];
    });
}

function populateReliableNewsSubjects() {
    ajaxCall('GET', 'seriousNewsSubjects', null, function(data) {
        console.log(data);
        document.getElementbyId("topnewsb1").value=data.subject[0];
        document.getElementbyId("topnewsb2").value=data.subject[1];
        document.getElementbyId("topnewsb3").value=data.subject[2];
        document.getElementbyId("topnewsb4").value=data.subject[3];
        document.getElementbyId("topnewsb5").value=data.subject[4];
    });
}

function populateAllTweetSubjects() {
    ajaxCall('GET', 'tweetSubjects', null, function(data) {
        console.log(data);
        document.getElementbyId("twitterb1").value=data.subject[0];
        document.getElementbyId("twitterb2").value=data.subject[1];
        document.getElementbyId("twitterb3").value=data.subject[2];
        document.getElementbyId("twitterb4").value=data.subject[3];
        document.getElementbyId("twitterb5").value=data.subject[4];
    });
}

function populateNewsTweetSubjects() {
    ajaxCall('GET', 'newsTweetSubjects', null, function(data) {
        console.log(data);
        document.getElementbyId("toptwitterb1").value=data.subject[0];
        document.getElementbyId("toptwitterb2").value=data.subject[1];
        document.getElementbyId("toptwitterb3").value=data.subject[2];
        document.getElementbyId("toptwitterb4").value=data.subject[3];
        document.getElementbyId("toptwitterb5").value=data.subject[4];
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
        var title = data.results[0].Title;
        var storyURL = data.results[0].URL;
        var articleEntry = '<p>' + title + '</p><p> <a href= ' + URL + '>' + URL + '</a></p>';
        document.getElementbyId("panel1").value=articleEntry;
    });
}

function getTopSeriousStories(subject) {
    var body = {};
    body.subject = subject;
    ajaxCall('POST', 'topSeriousStories', body, function(data) {
        console.log(data);
        //POPULATE NEWS HERE
    });
}

function getTopTweets(subject) {
    var body = {};
    body.subject = subject;
    ajaxCall('POST', 'topTweets', body, function(data) {
        console.log(data);
        //POPULATE TWEETS HERE.
    });
}

function getTopNewsTweets(subject) {
    var body = {};
    body.subject = subject;
    ajaxCall('POST', 'topNewsTweets', body, function(data) {
        console.log(data);
        //POPULATE TWEETS HERE.
    });
}

$(document).ready(function() {
    console.log('I am ready!');
    populateAllSubjects();
    getTopStories('Cancer');
    getTopSeriousStories('President of the United States');
});
