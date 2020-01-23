import React from 'react';
import Header from './utils/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from './actions';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Welcome from './pages/Welcome';
import Signout from './auth/Signout';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import UserShow from './user/UserShow';
import UserEdit from './user/UserEdit';
import League from './pages/League';
import Team from './pages/Team';
import Player from './pages/Player';
import Soccer from './pages/Soccer';
import EventDetails from './pages/EventDetails';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    // Sidebar
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Welcome} />
          <Route path="/signout" component={Signout} />
          <Route path="/soccer" component={Soccer} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/league/:league" component={League} />
          <Route path="/team/:id" component={Team} />
          <Route path="/player/:id" component={Player} />
          <Route path="/eventDetails/:id" component={EventDetails} />

          {this.props.authenticated ? (
            <div>
              <Route path="/user/:id" component={UserShow} />
              <Route path="/user/edit/:id" component={UserEdit} />
            </div>
          ) : (
            ''
          )}
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToPros, actions)(App);
