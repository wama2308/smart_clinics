import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import DefaultHeader from './containers/DefaultLayout/DefaultHeader';
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register, TestUser, RegisterEmail, TestPage, ConfirmCode, FormData, EnterPassword, ResetPassword, ConfirmCodeResetPassword, EnterResetPassword } from './views/Pages';


// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/testuser" name="TestUser" component={TestUser} />
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/register-email" name="Register Email Page" component={RegisterEmail} />
          <Route exact path="/testpage" name="TestPage" component={TestPage} />
          <Route exact path="/confirm-code" name="Confirm Code" component={ConfirmCode} />
          <Route exact path="/enter-password" name="Confirm Code" component={EnterPassword} />
          <Route exact path="/form-data" name="Form Data" component={FormData} />
          <Route exact path="/reset-password" name="Reset Password" component={ResetPassword} />
          <Route exact path="/confirm-code-reset-password" name="Confirm code reset password Password" component={ConfirmCodeResetPassword} />
          <Route exact path="/enter-reset-password" name="Enter reset password" component={EnterResetPassword} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}
// <Route path="/" name="Home" component={DefaultLayout} />
export default App;
