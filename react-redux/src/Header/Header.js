import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

class Header extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const user = localStorage.getItem('user')
        const parsedUser = JSON.parse(user)
        
        const{username} = parsedUser;
        const {loggedIn} = this.props
        return(
            <div className='header'>
            <Link to='/'>
                <h2>Logo</h2>
            </Link>
            
            <div className="headerRight">
                <Link to={`/${username}`}>
                    <p>My profile</p>
                </Link>
                <Link to='/login'>
                    <p>{loggedIn? 'Log out': 'Login'}</p>
                </Link>
            </div>

        
        </div>
        )
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const connectedApp = connect(mapState)(Header);
export { connectedApp as Header };
