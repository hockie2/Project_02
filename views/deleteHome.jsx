var React = require("react");
var Navbar = require('./components/navbar.jsx');
// var List = require('./components/listItem.jsx');

class DeleteHome extends React.Component {
  render() {


        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // console.log(this.props.homes)
        // console.log(this.props.images)

       const cards2 = this.props.images.map(image =>{

            const bkgrd = {
                backgroundImage:`url(${image.url})`
                }
            return(<div style={bkgrd} className="photo"/>)
            // return(<div><img src = {image.url} className="photo"/><div>)

    })

       var url = "/myhome/"+this.props.postId +"?_method=DELETE";

    return (
      <html>
      <head>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>

      <link rel="stylesheet" type="text/css" href="/myHomePage.css"/>
      </head>
      <body>
        <header>
            <Navbar/>
        </header>
            <div className="wrapper_new" >
                <div id="greeting">

                    </div>
                <div className="cards_wrapper">
                    {cards2}
                </div>

                <form action={url} method="POST">
                        <input type="submit" value="Delete"></input>
                    </form>
          </div>
      <script src="/script.js"></script>
      </body>
      </html>
      );
}
}

module.exports = DeleteHome;


    // return (
    //         <a href={`/${home.id}`} className = "cardBox_wrapper">
    //             <div className="cardBox_img">
    //                 <p className="cost">${numberWithCommas(home.cost)}</p>
    //                 <p className="location">{home.location}</p>
    //                 {images}
    //             </div>
    //         </a>
    //     )