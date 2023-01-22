# API
TO LAUNCH THE PROJECT RUN:

to install all the dependencies
``` npm i ```
<br />
to run the project
``` npx nodemon ```

# Organisation of the API

- token is usually in url params and so are id's in general
- other params such as channel_name or server_name are in the body

request is get when you are getting data from the server and post when you are sending data to the server

revochat.fr/api/
-> /v1/ 
   -> /client/get/friends/
   -> /channel/create/:channelName
   -> /server/get/
