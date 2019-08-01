const sha256 = require('js-sha256');
const SALT = "TwEeDr";

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */


  let showRegisterForm = (request, response) => {
    // let currentSessionCookie = request.cookies['loggedin'];
    // if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
        response.render('register');
    // }
    // else {
    //     response.redirect('/dreamhome');
    // }
  };
//////////////////////////////////////////////////////////////////////////////
  let register = (request, response) => {
    // check if username exist in the table

        let ownername = request.body.ownername;
        let password = sha256(request.body.password);
        db.accounts.checkUser(ownername, (err, callback) => {
            if (err) {
                // console.error("Error checking user: ", err.message);
                response.send("Error checking user");
            }

            //console.log(callback);
            if (callback) {
                response.send("You already registered. Please login.");

            } else {
                //  if rowcount = 0, means not registered
                db.accounts.createUser(ownername, password, (err, callback) => {

                    if (err) {
                        console.error("Error registering: ", err);
                        response.sendStatus(500);

                    } else {
                        //response.send("Register - Successful");
                        console.log(callback)
                        let owner_id = callback[0].id;
                        let currentSessionCookie = sha256( owner_id + 'logged_id' + SALT );
                        response.cookie('loggedin', currentSessionCookie);
                        response.cookie("ownername", callback[0].ownername);
                        response.redirect('/');
                    }
                })  // end of register db
            }
        })  // end of check user
  };
//////////////////////////////////////////////////////////////////////////////
let loginForm = (request, response) => {
        response.render('loginForm');
    }
//////////////////////////////////////////////////////////////////////////////
let login = (request, response) => {
        let ownername = request.body.ownername;
        let password = sha256(request.body.password);

    db.accounts.checkUser(ownername, (error, callback) => {
        // query syntax error
        if (error) {
            console.error("Error getting user: ", error.message);
            //response.sendStatus(400);
            response.send("Error getting user");
        }
        if (callback) {
            db.accounts.login(ownername, password,(error, callback) => {
                if (error || callback===null) {
                    // console.error("Error getting user: ", error.message);
                    //response.sendStatus(400);
                    response.send("Error getting user");
                }

                // console.log(callback)
                let owner_id = callback[0].id;
                let currentSessionCookie = sha256( owner_id + 'logged_id' + SALT )
                if (callback) {

                    // let data ={
                    //     cards:callback,
                    //     ownername:callback[0].ownername
                    // }

                    response.cookie('loggedin', currentSessionCookie);
                    response.cookie('ownername', callback[0].ownername);
                    response.redirect('/myhome');
                }
                else {
                    response.redirect('/?err=login');
                }
            });
        }
        else {
            response.send("Error getting user");
        }
    })
}
//////////////////////////////////////////////////////////////////////////////
let logout = (request, response) => {
    // console.log(request.cookies.loggedIn);
    response.clearCookie("loggedin");
    response.clearCookie("ownername");
    response.redirect('/');
};






  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {

    showRegisterForm: showRegisterForm,
    register:register,

    loginForm:loginForm,
    login:login,
    logout:logout

  };

}
