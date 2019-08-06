var React = require("react");
var Navbar = require('./components/navbar.jsx');
// var List = require('./components/listItem.jsx');

class Contractors extends React.Component {
  render() {

    // console.log(this.props.contractors)

   const cards = this.props.contractors.map(contractor =>{

        const bkgrd = {
            backgroundImage:`url(${contractor.logo_url})`
            }
        return(
            <div id="contractor_card">
                <div style={bkgrd} className="contractor_logo"/>
                <div className="contractor_name">{contractor.name}</div>
            </div>
            )
    })

    return (
      <html>
      <head>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" type="text/css" href="/home.css"/>
      </head>
          <body>
            <div className="main_wrapper">
                <Navbar/>
                <div className="wrapper_new" >
                     <div id="greeting">
                        <img src="logo.jpg" className="logo"/>
                    </div>
                    <div className="cards_wrapper">
                        <div id="contractor_card_wrapper">
                            {cards}
                        </div>
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

module.exports = Contractors;
