///////////////////
1.0.0 Backend installation

1.1.1 install node.js, if you allready have it, follow step 1.05
1.1.2 https://nodejs.org/en/ is good place to start downloading node.js

1.2.1 Install dependencies by following steps.
1.2.1 Open console CTRL + Ö
1.2.2 cd backend
1.2.3 npm i body-parser cookie-parser cors dotenv express express-jwt express-validator formidable jsonwebtoken lodash mongoose morgan nodemon uuid

1.3.1 Create .env file.
1.3.2  Place file inside /backend
1.3.3 Insert lines below inside .env file and save file
DATABASE = mongodb+srv://jellonavesa:admin@dunno.jeqdzvw.mongodb.net/?retryWrites=true&w=majority
PORT = 8000
JWT_SECRET = monkeh

///////////////////
2.0.0 Run local backend server

2.1.1 Open Console CRTL + Ö
2.1.2 Type npm start or nodemon app