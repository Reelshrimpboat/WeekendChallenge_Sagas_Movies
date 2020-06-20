const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//GET Router for movies
router.get('/', (req, res) => {
    let queryText = `SELECT "movies"."id" AS "id" , "title", "poster" , "description",  string_agg("genres"."name" , ', ' ORDER BY "genres"."id") AS "genre_name" FROM "movies"
                        FULL JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
                        FULL JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
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

// PUT Route
router.put('/:id', (req, res) => {

    console.log('in PUT Route, req.body.description', req.body.title)

    let queryText = `UPDATE "movies" SET ("title", "description")=('${req.body.title}' , '${req.body.description}') WHERE "id"='${req.body.id}';`;
    pool.query(queryText)
        .then((result) => {
            console.log('PUT Success', result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making PUT ${queryText}`, error);
            res.sendStatus(500);
        })
}); // END PUT Route

module.exports = router;