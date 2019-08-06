var React = require("react");
var Navbar = require('./components/navbar.jsx');
// var List = require('./components/listItem.jsx');


class MyHomePage extends React.Component {
  render() {


        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // console.log(this.props.homes)
        // console.log(this.props.images)

       const cards2 = this.props.home.map(image =>{

            const bkgrd = {
                backgroundImage:`url(${image.url})`
                }
            return(<div style={bkgrd} className = "photo"/>)
            // return(<div><img src = {image.url} className="photo"/><div>)

    })

       var edit_url = "/myhome/"+this.props.postId + "/edit";
       var delete_url = "/myhome/"+this.props.postId +"?_method=DELETE";
       var post_comment = "/myhome/"+this.props.postId +"?_method=POST";


//Map out comments from this post
const comments = this.props.callbackComments.map(comment =>{
        return(<div className = "comments">
                <img src={comment.profile_pic}/>
                <p>{comment.comment}</p>

            </div>
            )
        })

//Contractor LogoInfo
const bkgrd = {
            backgroundImage:`url(${this.props.contractor.logo_url})`
            }


    return (
      <html>
      <head>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>

      <link rel="stylesheet" type="text/css" href="/home.css"/>
      <link rel="stylesheet" type="text/css" href="/myHomePage.css"/>
      </head>
      <body>
      <header>
            <Navbar/>
            </header>
        <div className="main_wrapper">
            <div className="wrapper_new" >

                <div className="cards_wrapper">
                    {cards2}
                </div>

                    <div className="details_wrapper">
                        <div className="details"><h4>Renovation cost</h4><p>${numberWithCommas(this.props.home[0].cost)}</p></div>
                        <div className="details"><h4>Location</h4> <p>{this.props.home[0].location}</p></div>
                        <div className="details"><h4>Owner Name</h4> <p id="ownername">{this.props.home[0].ownername}</p></div>
                        <div className="details" id="loginname_wrapper"><h4>Login in user</h4> <p id="loginname">{this.props.cookieOwnerName}</p></div>


                        <div id="buttons_wrapper">
                            <button type="submit" value="Edit" id="edit">Edit</button>
                            <form action={edit_url} method="PUT" id="editform"/>

                            <button type="submit" value="Delete" id="delete" onclick="ConfirmDelete()">Delete</button>
                            <form action={delete_url} method="POST" id="deleteform"/>
                        </div>
                    </div>

                    <div id="contractor_card">
                        <div style={bkgrd} className="contractor_logo"/>
                        <div className="contractor_name">{this.props.contractor.name}</div>
                    </div>


                    <div className="new_comment">
                        <img src={this.props.loginOwnerPic}/>
                        <form action={post_comment} method="POST" id="new_comment">
                            <textarea rows="2" cols="20" name="comment_textarea" id="comment_textarea"></textarea>
                        </form>
                    </div>

                    <div className="comments_wrapper">
                        {comments}
                    </div>
                </div>
          </div>
          <div id="footer"/>
      <script src="/script.js"></script>
      </body>
      </html>
      );
}
}

module.exports = MyHomePage;


    // return (
    //         <a href={`/${home.id}`} className = "cardBox_wrapper">
    //             <div className="cardBox_img">
    //                 <p className="cost">${numberWithCommas(home.cost)}</p>
    //                 <p className="location">{home.location}</p>
    //                 {images}
    //             </div>
    //         </a>
    //     )