import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import { connect } from 'react-redux';
import {photoActions} from '../_actions'
import {Link} from 'react-router-dom'
import { history } from '../_helpers';
import { IoMdHeart } from "react-icons/io";

class MainPage extends Component{
    constructor(props){
        super(props)

        this.props.getAllPhotos();
    }

    render(){
        const {items} = this.props
        const photos = items
        const arrayOfImages = []
        console.log(history.location)
        
        photos?photos.map((result)=>arrayOfImages.push(
            <Link to={{pathname: `/photo/${result.id}`, state: { returnTo: this.props.location, background: history.location, photoUrl:result.imageUrl, photoId: result.id, username: result.username, profileImageUrl: result.profileImageUrl }}}><div className="card"><img src={result.imageUrl} />
                    <div className="cardFooter">
                        <div>
                            <div className="mainCircle" style={{backgroundImage: `url(${result.profileImageUrl})`}}/>
                            <p>{result.username}</p>
                        </div>
                        <div>
                            <IoMdHeart className="iconHeart" size="2rem"/>
                            <p>{`${result.likes} likes`}</p>
                        </div>
                        
                    </div>
                </div></Link>
        )):console.log("Loading...")
    
        

        console.log(photos)
        return(
            <div className="mainContent">
                <ul className="main-menu">
                    <li>Newest</li>
                </ul>
                <Masonry
                    breakpointCols={4}
                    className="my-masonry-grid-main"
                    columnClassName="my-masonry-grid_column-main">
                    {arrayOfImages}
                </Masonry>
            </div>
            
        )
    }
}

function mapState(state) {
    const { photos} = state
    const { items } = photos

    return {items}
}

const actionCreators = {
    getAllPhotos: photoActions.getAllPhotos
}

const connectedMainPage = connect(mapState, actionCreators)(MainPage);
export { connectedMainPage as MainPage };
