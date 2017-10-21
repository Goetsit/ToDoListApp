var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var taskRouter = require('./routes/task_route.js');
var taskCounter = require('./routes/task_counter.js');
var addTask = require('./routes/task_add.js');
var taskNote = require('./routes/task_note.js');
var taskComplete = require('./routes/task_complete.js');
var taskDelete= require('./routes/task_delete.js');
var taskNoteAlert= require('./routes/task_note_alert.js');
var poolModule = require('./modules/pool.js');
var pool = poolModule;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/tasklist', taskRouter);
app.use('/taskcounter', taskCounter);
app.use('/addtask', addTask);
app.use('/tasklist/complete', taskComplete);
app.use('/tasklist/delete', taskDelete);
app.use('/tasklist/note', taskNote);
app.use('/tasklist/note/alert/', taskNoteAlert);

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
