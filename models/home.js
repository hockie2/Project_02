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
let showMyHome = (ownername, callback) => {
    const query = `
                    SELECT homes.id,location,cost
                    FROM homes
                    INNER JOIN owners
                    ON homes.owner = owners.id
                    WHERE owners.ownername = '${ownername}'`;
        dbPoolInstance.query(query, (error, queryResult) => {
            // console.log(queryResult.rows)
            if( queryResult.rows.length > 0 ){
              callback(null, queryResult.rows);
            }else{
              callback(null, null);
            }
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let showMyImages = (ownername, callback) => {
    const query = `
                    SELECT url, home
                    FROM images
                    INNER JOIN owners
                    ON images.owner = owners.id
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
let addHomeForm = (ownername, callback) => {
    const query = `SELECT id FROM owners WHERE owners.ownername = '${ownername}'`;

        dbPoolInstance.query(query, (error, queryResult) => {
            // console.log(queryResult.rows)

            callback(error, queryResult.rows);
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let addHomePost = (ownername,location,cost,url, callback) => {

    const id_query = `SELECT id FROM owners WHERE owners.ownername = '${ownername}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

        let owner_id = queryResult.rows[0].id;

        // create entry into home table
        const query = `INSERT INTO homes(location,cost,owner) VALUES ($1,$2,$3) RETURNING id`;
        let values = [location, cost, owner_id];

            dbPoolInstance.query(query, values,(error, queryResult2) => {
                // console.log(queryResult.rows)
                if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
              }
              else{
                let homeId = queryResult2.rows[0].id;
                // callback1(error, queryResult2.rows);
                // console.log("saved home!")
                // console.log(homeId)
                // console.log(url)
                let counter = 0;
                // loop through image array, for each url, do an insert into images table
                for (var i = 0; i < url.length; i++) {

                    let image_query = `INSERT INTO images(url,home,owner) VALUES ($1,$2,$3)`;
                    let values2 = [url[i],homeId,owner_id];

                    dbPoolInstance.query(image_query, values2,(error, queryResult) => {
                        // console.log(queryResult.rows)
                        if (error) {
                            console.log(error)
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
            callback(error, queryResult.rows);
        })

}
/////////////////////////////////////////////////////////////////////////////////////
let myHomePost = (postId, callback) => {

    const id_query = `
                    SELECT homes.id,homes.location,homes.cost,homes.contractor,owners.ownername,owners.ownername,images.url
                    FROM homes INNER JOIN owners ON owners.id = homes.owner
                    INNER JOIN images ON images.home = homes.id
                    WHERE homes.id = '${postId}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
})
}
/////////////////////////////////////////////////////////////////////////////////////
let myHomeComments = (postId,callback) => {

    const id_query = `
                    SELECT comments.comment,comments.by_owner,owners.ownername,owners.profile_pic
                    FROM comments INNER JOIN owners ON owners.id = comments.by_owner
                    INNER JOIN homes ON homes.id = comments.onhome
                    WHERE homes.id = '${postId}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

            // console.log(queryResult);

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let postComment = (postId,ownername,comment, callback) => {

    const ownername_query = `SELECT id FROM owners WHERE ownername='${ownername}'`;

    dbPoolInstance.query(ownername_query,(error, queryResult_id) => {


    const query = `INSERT INTO comments(comment,onhome,by_owner) VALUES($1,$2,$3)`;
    let values = [comment,postId,queryResult_id.rows[0].id];
    dbPoolInstance.query(query,values,(error, queryResult) => {

        // console.log(queryResult.rows)
        if( error ){
            // invoke callback function with results after query has executed
            console.log('ERROR!!!')
            callback(error, null);
              }
        else{
            callback(error, queryResult.rows);
        }
    })
})
}

/////////////////////////////////////////////////////////////////////////////////////
let ownerProfilePic = (ownername, callback) => {

    const query = `SELECT profile_pic FROM owners WHERE owners.ownername = '${ownername}'`;

    dbPoolInstance.query(query ,(error, queryResult) => {
        // console.log(queryResult.rows)

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let editHomePost = (postId, callback) => {

    const id_query = `
                    SELECT homes.id,location,cost,url
                    FROM homes
                    INNER JOIN images
                    ON homes.id = images.home
                    WHERE homes.id = '${postId}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
})
}
/////////////////////////////////////////////////////////////////////////////////////
let updateHomePost = (postId,ownername,location,cost,url, callback) => {

    // console.log(url)

    const query1 = `UPDATE homes SET location = $1, cost = $2 WHERE id = $3 RETURNING id`;
    let values = [location,cost,postId]

    dbPoolInstance.query(query1, values,(error, queryResult) => {

        if( error ){
                // invoke callback function with results after query has executed
                console.log('ERROR!!!')
                callback(error, null);
              }
        else{
            // update entry into images table
            // console.log(url)
            // get the rows that is home = 2
            // do a loop for results.rows then check if results.rows[i].url === url[i], dont update
            // if not equal then update
            const getAllImage = `SELECT * FROM images WHERE home = '${postId}'`;

            dbPoolInstance.query(getAllImage, (error, imageResult) => {

                for (let i=0; i<imageResult.rows.length; i++) {
                    // if (imageResult.rows[i].url === url[i]) {
                    //     console.log("yes")
                    // }
                    // else {
                        // console.log("no");
                        // console.log(url[0])
                        const query = `UPDATE images SET url = $1 WHERE home = $2 RETURNING id `;
                        let values = [url[i],postId];

                        // console.log(url[i])

                         dbPoolInstance.query(query, values,(error, queryResult2) => {
                        console.log(queryResult2.rows)

                        if( error ){
                            console.log('ERROR!!!')
                        // invoke callback function with results after query has executed
                        callback(error, null);
                        }
                        callback(error, queryResult2.rows);
                        })

                    // }
                }

            })
            // for (var i = 0; i < url.length; i++) {
            //     // console.log(url[i])
            //    const query = `UPDATE images SET url = $1 WHERE home = $2 RETURNING id`;
            //     let values = [url[i],postId];

            //         dbPoolInstance.query(query, values,(error, queryResult2) => {
            //             // console.log("In UPDATE")
            //             if( error ){
            //                 console.log('ERROR!!!')
            //             // invoke callback function with results after query has executed
            //             callback(error, null);
            //           }
            //             callback(error, queryResult2.rows);
            //         })
            // }
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let getDeleteHomePost = (postId, callback) => {

    const id_query = `DELETE FROM homes WHERE id = $1 RETURNING id`;
    let values = [postId]

    dbPoolInstance.query(id_query, values,(error, queryResult) => {

        if( error ){
                // invoke callback function with results after query has executed
                console.log('ERROR!!!')
                callback(error, null);
              }
        else{

        // delete entry into home table
        const query = `DELETE FROM images WHERE home = $1 RETURNING id`;
        let values = [postId];

            dbPoolInstance.query(query, values,(error, queryResult2) => {
                console.log("In DELETE")
                if( error ){
                    console.log('ERROR!!!')
                // invoke callback function with results after query has executed
                callback(error, null);
              }
                callback(error, queryResult2.rows);
            })
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let deleteHomePost = (postId, callback) => {

    const id_query = `DELETE FROM homes WHERE id = $1 RETURNING id`;
    let values = [postId]

    dbPoolInstance.query(id_query, values,(error, queryResult) => {

        if( error ){
                // invoke callback function with results after query has executed
                console.log('ERROR!!!')
                callback(error, null);
              }
        else{

        // delete entry into home table
        const query = `DELETE FROM images WHERE home = $1 RETURNING id`;
        let values = [postId];

            dbPoolInstance.query(query, values,(error, queryResult2) => {
                console.log("In DELETE")
                if( error ){
                    console.log('ERROR!!!')
                // invoke callback function with results after query has executed
                callback(error, null);
              }
                callback(error, queryResult2.rows);
            })
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let contractorsAll = (postId, callback) => {

    const query = `SELECT * FROM contractors`;

    dbPoolInstance.query(query,(error, queryResult) => {

        // console.log(queryResult.rows)
        if( error ){
            // invoke callback function with results after query has executed
            console.log('ERROR!!!')
            callback(error, null);
              }
        else{
            callback(error, queryResult.rows);
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let contractorInfo = (postId, callback) => {

    const query = `
                    SELECT contractors.name, contractors.logo_url FROM contractors
                    INNER JOIN homes
                    ON homes.contractor = contractors.id
                    WHERE homes.id='${postId}'`;

    dbPoolInstance.query(query,(error, queryResult) => {

        // console.log(queryResult.rows)
        if( error ){
            // invoke callback function with results after query has executed
            console.log('ERROR!!!')
            callback(error, null);
              }
        else{
            callback(error, queryResult.rows);
        }
    })
}








  return {
    ownerProfilePic,
    showHome,
    showImages,

    showMyImages,
    showMyHome,

    addHomeForm,
    addHomePost,

    myHomePost,

    editHomePost,
    updateHomePost,
    getDeleteHomePost,
    deleteHomePost,

    myHomeComments,
    postComment,

    contractorsAll,
    contractorInfo
  };
};
