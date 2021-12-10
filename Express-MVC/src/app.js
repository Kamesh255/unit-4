const express = require("express");
const connect = require('./configs/db');

const evaluationController = require('./controllers/evel.controllers');
const studentController = require('./controllers/student.controllers');
const userController = require('./controllers/user.controllers');
const evalMarksController = require('./controllers/evel.controllers');

const app = express();
app.use(express.json());

app.use('/markEvals', evalMarksController);
app.use('', evaluationController);
app.use('/students', studentController);
app.use('/users', userController);



app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
}); 