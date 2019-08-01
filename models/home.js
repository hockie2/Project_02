const sha256 = require('js-sha256');
const SALT = "TwEeDr";

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

/////////////////////////////////////////////////////////////////////////////////////
let showImages = (request, callback) => {
    const query = `SELECT * FROM images`;


    dbPoolInstance.query(query, (error, queryResult) => {
    // console.log(queryResult)
     if( error ){
        // invoke callback function with results after query has executed
        callback(error, null);
      }
      else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
  })
}
/////////////////////////////////////////////////////////////////////////////////////

let showHome = (ownername, callback) => {
    const query = `SELECT * FROM homes`;

    dbPoolInstance.query(query, (error, queryResult) => {

     if( error ){
        // invoke callback function with results after query has executed
        callback(error, null);
      }
      else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
  })
}

// SELECT cost FROM costs INNER JOIN owners ON costs.owner = owners.id WHERE owners.ownername = '${ownername}'

/////////////////////////////////////////////////////////////////////////////////////
let showMyImages = (ownername, callback) => {
    const query = `
                    SELECT url
                    FROM images
                    INNER JOIN owners
                    ON images.home = owners.id
                    WHERE owners.ownername = '${ownername}'`;

    dbPoolInstance.query(query, (error, queryResult) => {
    // console.log(queryResult.rows)
     if( error ){
        // invoke callback function with results after query has executed
        callback(error, null);
      }
      else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
  })
}
/////////////////////////////////////////////////////////////////////////////////////
let showMyHome = (ownername, callback) => {
    const query = `
                    SELECT homes.id,location,cost
                    FROM homes
                    INNER JOIN owners
                    ON homes.owner = owners.id
                    WHERE owners.ownername = '${ownername}'`;
        dbPoolInstance.query(query, (err, queryResult) => {
            // console.log(queryResult.rows)
            callback(err, queryResult.rows);
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let addHomeForm = (ownername, callback) => {
    const query = `SELECT id FROM owners WHERE owners.ownername = '${ownername}'`;

        dbPoolInstance.query(query, (err, queryResult) => {
            // console.log(queryResult.rows)

            callback(err, queryResult.rows);
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let addHomePost = (ownername,location,cost,url, callback) => {

    const id_query = `SELECT id FROM owners WHERE owners.ownername = '${ownername}'`;

    dbPoolInstance.query(id_query ,(err, queryResult) => {

        let owner_id = queryResult.rows[0].id;

        // create entry into home table
        const query = `INSERT INTO homes(location,cost,owner) VALUES ($1,$2,$3) RETURNING id`;
        let values = [location, cost, owner_id];

            dbPoolInstance.query(query, values,(err, queryResult2) => {
                // console.log(queryResult.rows)
                if( err ){
                // invoke callback function with results after query has executed
                callback(error, null);
              }
              else{
                let homeId = queryResult2.rows[0].id;
                // callback1(err, queryResult2.rows);
                // console.log("saved home!")
                // console.log(homeId)
                // console.log(url)
                let counter = 0;
                // loop through image array, for each url, do an insert into images table
                for (var i = 0; i < url.length; i++) {

                    let image_query = `INSERT INTO images(url,home,owner) VALUES ($1,$2,$3)`;
                    let values2 = [url[i],homeId,owner_id];

                    dbPoolInstance.query(image_query, values2,(err, queryResult) => {
                        // console.log(queryResult.rows)
                        if (err) {
                            console.log(err)
                        } else {
                            // console.log("image saved" + i);
                            counter++;
                        }
                    });
                    if (counter === 3){
                            callback(null, true);
                    }
                };
              }
            })
            callback(err, queryResult.rows);
        })

}
/////////////////////////////////////////////////////////////////////////////////////
let myHomePost = (postId, callback) => {

    const id_query = `
                    SELECT homes.id,location,cost,url
                    FROM homes
                    INNER JOIN images
                    ON homes.id = images.home
                    WHERE homes.id = '${postId}'`;

    dbPoolInstance.query(id_query ,(err, queryResult) => {

            if( err ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(err, queryResult.rows);
            }
})
}
/////////////////////////////////////////////////////////////////////////////////////
let deleteHomePost = (postId, callback) => {

    const id_query = `DELETE FROM homes WHERE id = $1 RETURNING id`;
    let values = [postId]

    dbPoolInstance.query(id_query, values,(err, queryResult) => {

        if( err ){
                // invoke callback function with results after query has executed
                console.log('ERROR!!!')
                callback(error, null);
              }
        else{

        // delete entry into home table
        const query = `DELETE FROM images WHERE home = $1 RETURNING id`;
        let values = [postId];

            dbPoolInstance.query(query, values,(err, queryResult2) => {
                console.log("In DELETE")
                if( err ){
                    console.log('ERROR!!!')
                // invoke callback function with results after query has executed
                callback(err, null);
              }
                callback(err, queryResult2.rows);
            })
        }
    })
}










  return {
    showHome,
    showImages,
    showMyHome,
    showMyImages,
    addHomeForm,
    addHomePost,
    myHomePost,
    deleteHomePost,
    // addTweedPost:addTweedPost,
    // deleteTweedPost:deleteTweedPost,

    // showMyTweeds:showMyTweeds
  };
};
