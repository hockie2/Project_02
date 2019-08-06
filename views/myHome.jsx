var React = require("react");
var Navbar = require('./components/navbar.jsx');
// var List = require('./components/listItem.jsx');

class MyHome extends React.Component {
  render() {


        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // console.log(this.props.homes)
        // console.log(this.props.images)

       const cards2 = this.props.homes.map(home =>{

        // let imageArr = this.props.images.filter(image=>
        //     image.home===home.id)

        console.log(home)

        let images = this.props.images.map(image=>{
            const bkgrd = {
                backgroundImage:`url(${image.url})`
                }
            return(<div style={bkgrd} className="photo"/>)
            // return(<div><img src = {image.url} className="photo"/><div>)
        })

    return (
            <a href={`/myhome/${home.id}`} className = "cardBox_wrapper">
                <div className="cardBox_img">
                    <p className="cost">${numberWithCommas(home.cost)}</p>
                    <p className="location">{home.location}</p>
                    {images}
                </div>
            </a>
        )
    })

    return (
      <html>
      <head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" type="text/css" href="/home.css"/>
      <link rel="stylesheet" type="text/css" href="/myHome.css"/>
      </head>
      <body>

            <div className="main_wrapper">
            <Navbar/>
            <div className="wrapper_new" >
                 <div id="greeting">
                <img src="logo.jpg" className="logo"/>
                    <div id="hello">Hello, {this.props.cookieUserName}</div>
                </div>
                <h3>MY HOME</h3>
                <div className="cards_wrapper">
                    {cards2}
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

module.exports = MyHome;
