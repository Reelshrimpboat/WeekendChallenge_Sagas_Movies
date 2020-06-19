const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//GET Router for movies
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "movies";';
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in MOVIES GET', error)
        res.sendStatus(500);
    })
})//GET Ends

module.exports = router;