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
//Initial GET request, selects from the "task" table
var pool = new pg.Pool(config);

router.get('/',function(req,res){
  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'SELECT t.taskid, t.task, t.duedate, t.complete FROM "task" t ORDER BY t."complete", t."duedate" ASC;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});


module.exports = router;
