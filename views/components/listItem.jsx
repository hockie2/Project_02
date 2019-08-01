var React = require('react');

class List extends React.Component {
  render() {

const bkgrd = {backgroundImage:`url(${artist.photo_url})`}

    return (
        <html>
        <head>
        <link rel="stylesheet" type="text/css" href="/listItem.css"/>
        </head>
        <body>
            <div className="img_wrapper">
                <a href="#">
                    <div style={bkgrd}/>
                </a>

            </div>
        </body>
        </html>
  )
}
}

module.exports = List;