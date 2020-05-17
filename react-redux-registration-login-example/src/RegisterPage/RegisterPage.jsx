import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();
        
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {

        const { user } = this.state;
        return (
            <div className="mainContainer">
                <div className="formanddescription">
                    <div className="container1">
                        <form className="form" onSubmit={this.handleSubmit}>
                            <h2>Registration</h2>
                            <div className="form-group">
                                
                                <input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} placeholder="FirstName"/>
                            </div>
                            <div className="form-group">
                                
                                <input type="text" name="lastName" value={user.lastName} onChange={this.handleChange} placeholder="LastName"/>
                            </div>
                            <div className="form-group">
                            
                                <input type="text" name="username" value={user.username} onChange={this.handleChange} placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                
                                <input type="password" name="password" value={user.password} onChange={this.handleChange} placeholder="Password"/>
                            </div>

                            <div className="btn">
                                <button type="submit">Sign In</button>
                            </div>
                            
                        </form>
                    </div>
                    <div className="container2">
                        <div className="description">
                            <h2>Find your inspiration!</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor sollicitudin ante vitae rutrum. In aliquet tempus dui, at vulputate lorem tristique in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque vehicula sem sit amet risus pellentesque faucibus.</p>
                        </div>
        
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register,
    logout: userActions.logout
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };