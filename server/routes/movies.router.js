const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//GET Router for movies
router.get('/', (req, res) => {
    let queryText = `SELECT "movies"."id" AS "id" , "title", "poster" , "description",  string_agg("genres"."name" , ',' ORDER BY "genres"."id") AS "genre_name" FROM "movies"
                        JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
                        JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
                        GROUP BY "movies"."id";`;
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