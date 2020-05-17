import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {ProfilePage} from '../ProfilePage'
import {Header} from '../Header'
import test from './test'
import './style.css'
import {Modal} from '../Modal'
import {AddImagePage} from '../AddImagePage/AddImagePage'
import {MainPage} from '../MainPage'


class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        
        });
        
    }

    render() {
        const { authentication } = this.props;
      
        let background = history.location.state && history.location.state.background
   
        const Page = authentication.loggedIn?HomePage:RegisterPage

        return (
            <div>
                <Router history={history}>
                    <Header/>
                    <Switch location={background}>
                        <PrivateRoute exact path="/" component={ProfilePage} />
                        {/* <Route path="/" exact component={Page} /> */}
                        <Route path="/login" component={LoginPage} />
                        <Route exact path='/register' component={RegisterPage}/>
                        <Route path='/add' component={AddImagePage}/>
                        <Route path='/main' component={MainPage}/>
                        <PrivateRoute exact path='/:username' name="profile" component={ProfilePage}/>
                        
                        <Redirect from="*" to="/" />
                    </Switch>
                    <Route  path='/photo/:id' children={<Modal/>}/>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    const { alert, authentication } = state;
    return { alert, authentication };
}

const actionCreators = {
    clearAlerts: alertActions.clear,

};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };