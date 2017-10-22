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

//DELETE request, uses the delete button to initilize request, deletes subsequent task and task_note(s)

router.delete('/:taskid',function(req,res){   //mark ready for transfer PUT
    var taskid = req.params.taskid;
    var task = req.body;
    console.log(task);
  
    pool.connect(function(errorConnectingToDB, db, done) {
      if(errorConnectingToDB){
          console.log('Error Connecting to DB', errorConnectingToDB);
          res.sendStatus(500);
      } else {
        var queryText = 'DELETE FROM "task" WHERE "taskid" = $1;';
        db.query(queryText,[taskid], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery){
            console.log('error making query', errorMakingQuery, result);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      }
    });
  });


  module.exports = router;
