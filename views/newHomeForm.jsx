var React = require("react");
var Navbar = require('./components/navbar.jsx');
var List = require('./components/listItem.jsx');

class NewHomeForm extends React.Component {
  render() {

    console.log(this.props.id)




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
                        <h2>HOME DETAILS</h2>

                        <div id="form_wrapper">
                            <form action="/myhome/" method="POST">
                                <p>LOCATION</p><input name="location"></input>
                                <p>ESTIMATED COST</p><input name="cost"></input>

                                <p>PHOTO 1</p><input name="url" className="field"></input>
                                <p>PHOTO 2</p><input name="url" className="field"></input>
                                <p>PHOTO 3</p><input name="url" className="field"></input>

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

module.exports = NewHomeForm;
// <img src="https://i.pinimg.com/originals/d8/35/24/d83524c142c8f0c51e8d232ef28009e5.jpg"/>