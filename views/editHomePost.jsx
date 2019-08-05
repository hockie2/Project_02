var React = require("react");
var Navbar = require('./components/navbar.jsx');
// var List = require('./components/listItem.jsx');




class EditHomePost extends React.Component {
  render() {

    var url = "/myhome/"+this.props.postId + "?_method=PUT";

    let photoURLs = this.props.images.map(url=>{

        return (
                <div>
                    <p>PHOTO</p><input name="url" className="field" defaultValue={url.url}></input>
                </div>
            )
    })


    return (
      <html>
      <head>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" type="text/css" href="/newHomeForm.css"/>
      </head>
      <body>
        <header>
            <Navbar/>
        </header>
            <div className="wrapper_new" >

                <div className="cards_wrapper">
                    <div id="left">

                    </div>
                    <div id="right">
                        <h2>EDIT HOME DETAILS</h2>

                        <div id="form_wrapper">
                            <form action={url} method="POST">
                                <p>LOCATION</p><input name="location" defaultValue={this.props.location}></input>
                                <p>ESTIMATED COST ($)</p><input name="cost" defaultValue={this.props.cost}></input>

                                {photoURLs}

                                <p><input type="submit" name="submit" className="submitButton"/></p>
                            </form>
                        </div>
                    </div>

                </div>
          </div>
      <script src="/script.js"></script>
      </body>
      </html>
      );
}
}

module.exports = EditHomePost;
// <img src="https://i.pinimg.com/originals/d8/35/24/d83524c142c8f0c51e8d232ef28009e5.jpg"/>