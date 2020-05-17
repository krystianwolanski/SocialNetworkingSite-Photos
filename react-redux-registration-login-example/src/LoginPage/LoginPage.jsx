import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {alertActions} from '../_actions'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleChange(e) {
        const { name, value } = e.target;
        
        this.setState({[name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
  
        // this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
        
    }
    

    render() {
        const ColorButton = withStyles(() => ({
            root: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
            },
        }))(Button);

        const { username, password } = this.state;
        return (
            <div className="mainContainerLogin">
                <div className="container">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>      
                        <FormControl >
                            <InputLabel htmlFor="my-input">Username</InputLabel>
                            <Input type="text" name="username" value={username} onChange={this.handleChange} id="my-input" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" value={password} onChange={this.handleChange} type="password" id="password"/>
                    
                        </FormControl>
                        
                        <div className="buttonContainer">
                       
                            <ColorButton type="submit" variant="contained" color="primary">
                                Log In
                            </ColorButton>
                        </div>
                       
                    </form>
                </div>
        </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };