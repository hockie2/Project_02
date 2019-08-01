const sha256 = require('js-sha256');
const SALT = "TwEeDr";

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */


////////////////////////////////////////////////////////////////////////////////
  let home = (request, response) => {

    db.dreamhome.showImages(request, (err, callbackImages) => {

        const ownername = request.cookies.ownername;

            db.dreamhome.showHome(ownername, (err, callbackHome) => {

                    // console.log(callbackImages)

                    var data = {
                        images:callbackImages,
                        homes: callbackHome,
                        cookieUserLogin: request.cookies["loggedin"],
                        cookieUserName: request.cookies.ownername
                    }

                    response.render('home',data)

            })
    })
  };

//////////////////////////////////////////////////////////////////////////////
  let showMyHome = (request, response) => {

    const ownername = request.cookies.ownername;

    db.dreamhome.showMyImages(ownername, (err, callbackImages) => {

            db.dreamhome.showMyHome(ownername, (err, callbackHome) => {

                    // console.log(callbackHome.rows)

                    var data = {
                        images:callbackImages,
                        homes: callbackHome,
                        cookieUserLogin: request.cookies["loggedin"],
                        cookieUserName: request.cookies.ownername
                    }

                    response.render('myHome',data)

            })
    })
  };
//////////////////////////////////////////////////////////////////////////////
let addHomeForm = (request, response) => {

    const ownername = request.cookies.ownername;

    // request.body.ownername = ownername;

   db.dreamhome.addHomeForm(ownername, (err, callback) => {
        if (err) {
                console.error("Error posting tweed: ", err.message);
                response.send("Query error for tweeding");

            } else {
                let data={
                    id:callback
                }

                //response.send("Tweed - Successful")
                response.render("newHomeForm",data)
            }
})

}
//////////////////////////////////////////////////////////////////////////////

let addHomePost = (request, response) => {

    const ownername = request.cookies.ownername;

    const location = request.body.location;
    const cost = request.body.cost;
    const url = request.body.url;

    // console.log(url)

    // request.body.ownername = ownername;

    db.dreamhome.addHomePost(ownername,location,cost,url, (err, callbackHome) => {
        if (err) {
                console.error("Error posting tweed: ", err.message);
                response.send("Query error for posting");

            } else {
                //response.send("Tweed - Successful")
                response.redirect("/myhome")
            }
})
}

//////////////////////////////////////////////////////////////////////////////
let myHomePost = (request, response) => {

    const ownername = request.cookies.ownername;
    const postId = request.params.id;

    db.dreamhome.myHomePost(postId, (err, callback) => {
        if (err) {
                console.error("Error deleting post: ", err.message);
                response.send("Query error for deleting");

            } else {
                //response.send("Tweed - Successful")

                let data = {
                    location:callback[0].location,
                    cost:callback[0].cost,
                    images:callback,
                    postId:postId
                }
                // console.log(data.images)
                response.render("myhomePage",data)
            }
    })
}


//////////////////////////////////////////////////////////////////////////////
let deleteHomePost = (request, response) => {

    const ownername = request.cookies.ownername;
    const postId = request.params.id;

    db.dreamhome.deleteHomePost(postId, (err, callback) => {
        if (err) {
                console.error("Error deleting post");
                response.send("Query error for deleting");

            } else {
                //response.send("Tweed - Successful")

                response.redirect("/myhome")
            }
    })
}



  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {

    home:home,
    showMyHome:showMyHome,

    addHomeForm:addHomeForm,
    addHomePost:addHomePost,
    myHomePost:myHomePost,

    deleteHomePost:deleteHomePost,
    // addtweedPost:addtweedPost,
    // deletetweedPost:deletetweedPost,


  };

}
