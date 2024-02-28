#client
1) npm install
2) npm i react-redux @reduxjs/toolkit react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid 
3) npm i -D @types/react-dom
4) npm i -D eslint eslint-config-react-app
5) npm i -D @types/node
6) npm install recharts
7) npm install @mui/material @emotion/react @emotion/styled

=====================================================

#server
1) npm init -y
2) npm i express body-parser cors dotenv helmet morgan mongoose mongoose-currency

now after this i got this error : The error message suggests that there is a conflict between the required versions of mongoose in your project and the one required by mongoose-currency

so I did : npm install --force

If you didnt face any issue, then cool, go ahead

3) npm i -D nodemon 

faced the same issue 

so I again did : npm install --force

**************************************

Use this to run project:
server -->  npm run dev
client --> npm run dev

--> if the above doesn work, try doing client first and then server

**************************************
