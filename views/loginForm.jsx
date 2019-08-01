var React = require("react");
var Navbar = require('./components/navbar.jsx');

class Login extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/login.css"/>
        </head>
        <body>
            <header>
              <Navbar/>
            </header>

            <div className="wrapper_new" >
                <div className="cards_wrapper" >
                    <div id="left">

                    </div>
                    <div id="right">
                        <h2>LOGIN</h2>

                        <div id="form_wrapper">
                            <form action="/login/" method="POST">
                                <p>Username</p><input name="ownername"></input>
                                <p>Password</p><input name="password"></input>

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

module.exports = Login;
