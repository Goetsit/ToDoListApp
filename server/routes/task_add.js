var express = require('express');
var pg = require('pg');

var router = express.Router();
var config = {
  database: 'deneb',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

//POST request, inserts new task with default of False for complete and appends the new task to the DOM. This uses the Add Task button to star the request

router.post('/',function(req,res){
    var task = req.body;
    console.log('TASK ON POST', task)
  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
        var queryText = 'INSERT INTO "task" ("task", "duedate") VALUES ($1, $2);';
        db.query(queryText, [task.task, task.duedate], function (errorMakingQuery, result) {
        done();
        if(errorMakingQuery){
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
    
          res.send(result.rows);
        }
      });
    }
  });
});


module.exports = router;
