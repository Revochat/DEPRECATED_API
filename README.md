TO DO LIST:

- MAKE ROUTERS
- INTERFACES FOR THE ROUTERS

- CLIENT SIDE API
- FUNCTIONS FOR THE CLIENT SIDE API

- DEFINE USER OBJECT
- MAKE USER INTERFACE

- DATABASE POUR JUSTE ENREGISTRER LE WALLET TOKEN
 -> table user avec wallet token, username, password (généré par nous), created_at, last_connection
 

revochat.fr/api/
-> /client/ 
   -> /messages/{id}
   -> /


---------------

EMITTERS: 

 ROUTERS:

- readyRoute (route, params) -> when all the routes are ready
- loadRoute (route, params) -> when the routes are loading

REQUESTS:

- errors (errors) -> when there is an error
- channel (token) -> when request a channel
- messages (publicAddress) -> when a message is sent to someone ( /!\ CAN'T INTERCEPT THE MESSAGE /!\ )

