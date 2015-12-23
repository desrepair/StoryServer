# StoryServer
The package consists of the following:
1. server.js
Description:
It acts as the backend server. It initiates the mysql connections and pulls in data from the different databases of news sources, counting the topics and loading the top 5 topics from every news source. It is part of the server contents.
It is run in the following manner locally:

$npm install
$node server.js

2. public/data.js
Description:
Creates the connection between the front end website and the backend server. It is used to change the contents of the buttons and populating the respective panels with the news headlines.
It is part of the website.

3. public/index.html
This is the main website. It is divided based on the different sections. It is reachable using the link: http://topstory.elasticbeanstalk.com

4. public/tech.html
It is used to display the powerpoint presentation. It is reachable using the link: http://topstory.elasticbeanstalk.com/tech.html
