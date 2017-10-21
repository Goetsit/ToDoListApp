var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var taskRouter = require('./routes/task_route.js');
var taskCounter = require('./routes/task_counter.js');
var addTask = require('./routes/task_add.js');
var taskComplete = require('./routes/task_complete.js');
var poolModule = require('./modules/pool.js');
var pool = poolModule;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/tasklist', taskRouter);
app.use('/taskcounter', taskCounter);
app.use('/addtask', addTask);
app.use('/tasklist/complete', taskComplete);

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
