module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
    const homeControllerCallbacks = require('./controllers/home')(allModels);
    const accountsControllerCallbacks = require('./controllers/accounts')(allModels);

    // app.get('/', homeControllerCallbacks.index);


    app.get('/', homeControllerCallbacks.home);

    app.get('/register', accountsControllerCallbacks.showRegisterForm);
    app.post('/register', accountsControllerCallbacks.register);

    app.get('/login', accountsControllerCallbacks.loginForm);
    app.post('/login', accountsControllerCallbacks.login);
    app.get('/logout', accountsControllerCallbacks.logout);


    app.get('/myhome', homeControllerCallbacks.showMyHome);

    app.get('/myhome/addhome', homeControllerCallbacks.addHomeForm);
    app.post('/myhome/', homeControllerCallbacks.addHomePost);

    app.get('/myhome/:id', homeControllerCallbacks.myHomePost);
    app.post('/myhome/', homeControllerCallbacks.deleteHomePost);

    // app.get('/tweedr/mytweeds', homeControllerCallbacks.showMyTweeds);
    app.delete('/myhome/:id', homeControllerCallbacks.deleteHomePost);
};
