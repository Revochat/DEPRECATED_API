# API
TO LAUNCH THE PROJECT RUN:

to install all the dependencies
``` npm i ```
<br />
to run the project
``` npx nodemon ```

# Organisation of the API

revochat.fr/api/
-> /v1/
-> /client/ 
   -> /client/get/friends/:token
   -> /channel/create/:token/:channelName
   
   -> /server/get/:token


DM = no owner id > create channel + addmembers
GROUP = owner id > create channel + addmembers