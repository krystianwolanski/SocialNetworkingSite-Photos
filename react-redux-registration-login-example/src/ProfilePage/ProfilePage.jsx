import React from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css'
import { profileActions } from '../_actions';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import {photoActions} from '../_actions'
import {Link, useLocation} from 'react-router-dom'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        const username = this.props.match.params.username?this.props.match.params.username:this.props.user.username;

        this.props.getProfile(username)
        this.props.getPhotos(username)
    }

    render() {

        const {profile, profiles, items} = this.props
        const photos = items
        
    
        if(profiles.error)
            return profiles.error
        
        const arrayOfImages = []
   
        photos?photos.map((result)=>arrayOfImages.push(
                <Link to={{pathname: `/photo/${result.id}`, state: { returnTo: this.props.location, background: history.location, photoUrl:result.imageUrl, photoId: result.id, username: result.username, profileImageUrl: result.profileImageUrl }}}><div className="card"><img src={result.imageUrl} /></div></Link>
            )):console.log("Loading...")
        
  
        const ColorButton = withStyles(() => ({
            root: {
                backgroundColor: '#2390E5',
                '&:hover': {
                    backgroundColor: '#0063b2',
                },
            },
            outlined: {
                backgroundColor: 'white',
                color: '#2390E5',
                borderColor: '#2390E5',
                '&:hover': {
                    backgroundColor: '#e5f3ff'
                }
            }
        }))(Button);
        
        const user = localStorage.getItem('user')
        const parsedUser = JSON.parse(user)
        const thisUser = this.props.profile && this.props.profile.username === parsedUser.username
        
        
        return (
            <div>
              
                <div className="banner" style={{backgroundImage: `url(${profile && profile.bannerImageUrl})`}}></div>
                <div className="profileContent">
                    <div className="profileDescription">
                       
                            <div className="circle" style={{backgroundImage: `url(${profile && profile.profileImageUrl})`}}></div>
                            <h2 className="name">{`${profile && profile.firstName} ${profile && profile.lastName}`}</h2>
                            <div className="shortDescription">
                                {profile && profile.shortDescription}
                            </div>
                            <div className="buttonsContainer">
                                <ColorButton variant="contained" color="primary">
                                    Follow
                            </ColorButton>
                                <ColorButton variant="outlined" color="primary">
                                    Message
                            </ColorButton>
                            </div>
                            <div className="about">
                                <h4>About</h4>
                                <p>{profile?profile.description:""}</p>
                            </div>
                      
                    </div>
                    <div className="images">
                        <Masonry
                            breakpointCols={3}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {arrayOfImages}
                        </Masonry>

                        {thisUser && <Link to="/add"><Button variant="contained" color="primary">Add Photo!</Button></Link>}
                    </div>
                    
                    
                </div>
            
            </div>
        )
    }
}
function mapState(state) {
    const {profiles, photos, authentication} = state
    const {profile} = profiles
    const { items } = photos
    const { user } = authentication

    return {profile, profiles, items, user}
}

const actionCreators = {
    getProfile: profileActions.getProfile,
    getPhotos: photoActions.getPhotos
}

const connectedProfilePage = connect(mapState, actionCreators)(ProfilePage);
export { connectedProfilePage as ProfilePage };
