const sha256 = require('js-sha256');
const SALT = "TwEeDr";

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAll = (callback) => {

    let query = 'SELECT * FROM users';

    dbPoolInstance.query(query, (error, queryResult) => {
      if( error ){
        // invoke callback function with results after query has executed
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

/////////////////////////////////////////////////////////////////////////////////////
let checkUser = (ownername, callback) => {
        const query = `SELECT * FROM owners WHERE ownername = $1`;
        let values = [ownername.toLowerCase()];

        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {

                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {

                    callback(null, null);
                }
            }
        });
    }
/////////////////////////////////////////////////////////////////////////////////////
let createUser = (ownername,password,callback) => {

    const query = `INSERT INTO owners (ownername, password) VALUES ($1, $2) RETURNING *`;
    const values = [ownername.toLowerCase(), password];

     dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let login = (ownername,password, callback) => {

        const query = `SELECT * FROM owners WHERE ownername = $1 AND password = $2`;
        const values = [ownername,password];

        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            }
            else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };
/////////////////////////////////////////////////////////////////////////////////////

  return {
    checkUser,
    createUser,

    login,



  };
};
