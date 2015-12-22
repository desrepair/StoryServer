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
        //CHANGE BUTTON TEXT HERE
    });
}

function populateReliableNewsSubjects() {
    ajaxCall('GET', 'seriousNewsSubjects', null, function(data) {
        console.log(data);
        //CHANGE BUTTON TEXT HERE
    });
}

function populateAllTweetSubjects() {
    ajaxCall('GET', 'tweetSubjects', null, function(data) {
        console.log(data);
        //CHANGE BUTTON TEXT HERE.
    });
}

function populateNewsTweetSubjects() {
    ajaxCall('GET', 'newsTweetSubjects', null, function(data) {
        console.log(data);
        //CHANGE BUTTON TEXT HERE.
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
        //POPULATE NEWS HERE
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
