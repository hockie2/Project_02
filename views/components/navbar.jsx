var React = require("react");

class Navbar extends React.Component {
  render() {

    // console.log(this.props.cookieUserName)


    return (

        <div id="nav_wrapper">
            <div className="nav_left">
                <a class="active" href="/"><div className="nav_button"><img src="/icons/home.png" className="icons"/>Home</div></a>
                <div id="dashboard"><a href="/myhome" id="dashboard">My Dashboard</a></div>
                <div id="addhome"><a href="/myhome/addhome">Add your Home</a></div>
                <a href="/myhome/contractors">Contractors</a>
            </div>

            <div className="nav_right">
                <a href="/register">Register</a>
                <div id="loginbutton"><a href="/login" ><div className="nav_button"><img src="/icons/login2.png" className="icons"/>Login</div></a></div>
            </div>

        </div>

      );
}
}

module.exports = Navbar;
