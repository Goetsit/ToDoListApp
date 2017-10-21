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

router.get('/:taskid',function(req,res){
    var taskid = req.params.taskid;
    console.log(taskid);
  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'SELECT tn."note" FROM "task_note" tn WHERE tn."taskid" = $1;';
      db.query(queryText, [taskid],function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          console.log('CONSOLE LOG RESULT ROWS',result.rows);
          res.send(result.rows);
          //res.send('testing test');
        }
      });
    }
  });
});


module.exports = router;
