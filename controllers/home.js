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

    db.dreamhome.showImages(request, (error, callbackImages) => {

        const ownername = request.cookies.ownername;

            db.dreamhome.showHome(ownername, (error, callbackHome) => {

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

    db.dreamhome.showMyImages(ownername, (error, callbackImages) => {

            db.dreamhome.showMyHome(ownername, (error, callbackHome) => {

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

   db.dreamhome.addHomeForm(ownername, (error, callback) => {
        if (error) {
                console.error("Error posting tweed: ", error.message);
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

    db.dreamhome.addHomePost(ownername,location,cost,url, (error, callbackHome) => {
        if (error) {
                console.error("Error posting tweed: ", error.message);
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
    // request.body.ownername = ownername;

    const postId = request.params.id;

    db.dreamhome.myHomePost(postId, (error, callback) => {
        if (error) {
                console.error("Error deleting post: ", error.message);
                response.send("Query error for deleting");

            }
            else {
                //response.send("Tweed - Successful")
                // console.log(callback)

                db.dreamhome.myHomeComments(postId,(error, callbackComments) => {

                    if (ownername){
                    db.dreamhome.ownerProfilePic(ownername,(error, callbackOwnerPic) => {

                        let data = {
                            location:callback[0].location,
                            cost:callback[0].cost,
                            ownername:callback[0].ownername,
                            callbackComments:callbackComments,
                            loginOwnerPic:callbackOwnerPic[0].profile_pic,
                            images:callback,
                            postId:postId,
                            cookieUserLogin: request.cookies["loggedin"],
                            cookieOwnerName: request.cookies.ownername
                        }
                        response.render("myhomePage",data)
                    })
                }
                    else{
                        let data = {
                            location:callback[0].location,
                            cost:callback[0].cost,
                            ownername:callback[0].ownername,
                            callbackComments:callbackComments,
                            // loginOwnerPic:callbackOwnerPic[0].profile_pic,
                            images:callback,
                            postId:postId,
                            cookieUserLogin: request.cookies["loggedin"],
                            cookieOwnerName: request.cookies.ownername
                        }
                        response.render("myhomePage",data)
                    }

            })
        }
    })
}

//////////////////////////////////////////////////////////////////////////////
let editHomePost = (request, response) => {

    const ownername = request.cookies.ownername;
    request.body.ownername = ownername;

    const postId = parseInt(request.params.id);

    db.dreamhome.editHomePost(postId, (error, callback) => {
        if (error) {
                console.error("Error deleting post");
                response.send("Query error for deleting");

            } else {
                //response.send("Tweed - Successful")

                // console.log(callback)

                let data = {
                    location:callback[0].location,
                    cost:callback[0].cost,
                    images:callback,
                    postId:postId
                }

                response.render("editHomePost",data)
            }
    })
}
//////////////////////////////////////////////////////////////////////////////
let updateHomePost = (request, response) => {

     const ownername = request.cookies.ownername;
     const id = parseInt(request.params.id);
    const location = request.body.location;
    const cost = request.body.cost;
    const url = request.body.url;

    // console.log(url)

    // request.body.ownername = ownername;

    db.dreamhome.updateHomePost(id,ownername,location,cost,url, (error, callbackHome) => {
        if (error) {
                console.error("Error posting tweed: ", error.message);
                response.send("Query error for updating");
            }
        else {
            //response.send("Tweed - Successful")
            response.redirect("/myhome")
        }
    })
}
//////////////////////////////////////////////////////////////////////////////
// let getdeleteHomePost = (request, response) => {

//     const ownername = request.cookies.ownername;
//     const postId = request.params.id;

//     db.dreamhome.deleteHomePost(postId, (error, callback) => {
//         if (error) {
//                 console.error("Error deleting post");
//                 response.send("Query error for deleting");

//             } else {
//                 //response.send("Tweed - Successful")

//                 response.redirect("/myhome")
//             }
//     })
// }
//////////////////////////////////////////////////////////////////////////////
let getDeleteHomePost = (request, response) => {

    const ownername = request.cookies.ownername;
    const postId = request.params.id;

    db.dreamhome.deleteHomePost(postId, (error, callback) => {
        if (error) {
                console.error("Error deleting post");
                response.send("Query error for deleting");

            } else {
                //response.send("Tweed - Successful")

                response.redirect("/myhome")
            }
    })
}
//////////////////////////////////////////////////////////////////////////////
let deleteHomePost = (request, response) => {

    const ownername = request.cookies.ownername;
    const postId = request.params.id;

    db.dreamhome.deleteHomePost(postId, (error, callback) => {
        if (error) {
                console.error("Error deleting post");
                response.send("Query error for deleting");

            } else {
                //response.send("Tweed - Successful")

                response.redirect("/myhome")
            }
    })
}
//////////////////////////////////////////////////////////////////////////////
let contractors = (request, response) => {

    // const ownername = request.cookies.ownername;
    // const postId = request.params.id;

    db.dreamhome.contractors(postId, (error, callback) => {
        if (error) {
                console.error("Error deleting post");
                response.send("Query error for deleting");
        }
        else {
            //response.send("Tweed - Successful")
            console.log('HELLOPOOOOOOOOOOOOOOOOOOOO')
            response.render("contractors")
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

    editHomePost:editHomePost,
    updateHomePost:updateHomePost,

    getDeleteHomePost:getDeleteHomePost,
    deleteHomePost:deleteHomePost,

    contractors:contractors,

  };

}
