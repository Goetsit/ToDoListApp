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

//POST request, inserts a note with the corresponding taskid into "task_note"

router.post('/', function (req, res) {
    var task = req.body

    console.log('task_note testing', task);

    pool.connect(function (errorConnectingToDB, db, done) {
        if (errorConnectingToDB) {
            console.log('Error connecting to db', errorConnectingToDB);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "task_note" ("taskid", "note") VALUES ($1,$2);';
            db.query(queryText, [task.taskid, task.note], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
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
