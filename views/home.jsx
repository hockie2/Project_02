var React = require("react");
var Navbar = require('./components/navbar.jsx');
// var List = require('./components/listItem.jsx');

class Home extends React.Component {
  render() {




        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }


       const cards2 = this.props.homes.map(home =>{

        let imageArr = this.props.images.filter(image=>
            image.home===home.id)


        let images = imageArr.map(image=>{
            const bkgrd = {
                backgroundImage:`url(${image.url})`
                }
            return(
                <div className="mySlides fade">
                <div style={bkgrd} className="photo"/>
                </div>
                )
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
      <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>

      <link rel="stylesheet" type="text/css" href="/home.css"/>
      </head>
      <body>
        <header>
            <Navbar/>
        </header>
            <div className="main_wrapper">
            <div className="wrapper_new" >
                <div id="greeting">
                <img src="logo.jpg" className="logo"/>

                    <div id="hello">Hello, {this.props.cookieUserName}</div>
                </div>
                <div id="gif"></div>
                <div id="footer"/>
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

module.exports = Home;
// a href={`/myhome/${home.id}`}



// <div className = "slideshow-container">
//                 <div className="cardBox_img">
//                     <p className="cost">${numberWithCommas(home.cost)}</p>
//                     <p className="location">{home.location}</p>
//                     {images}
//                     <a className="prev" onclick="plusSlides(-1)">❮</a>
//                     <a className="next" onclick="plusSlides(1)">❯</a>
//                 </div>
//             </div>