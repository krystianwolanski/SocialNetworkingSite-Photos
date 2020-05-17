import React from 'react'
import { profileActions, commentActions } from '../_actions';
import { connect } from 'react-redux';
import { history } from '../_helpers'
import { FiAperture } from "react-icons/fi";
import Comment from '../Comment'


class Modal extends React.Component {
    constructor(props){
        super(props)

        const photoId = history.location.state.photoId
        
        this.props.getComments(photoId)
        this.state = {newComment: ''}
    }

    componentDidMount(){
        
    }
    
    back(e) {
     
        history.goBack()
    }
    handleChange(event) {
        this.setState({newComment: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault();

        const {newComment} = this.state
        this.props.postComment(newComment, history.location.state.photoId )
        this.setState({newComment: ''})
    }
    render() {
       const {items} = this.props
       const {newComment} = this.state
       const {profile} = this.props
       const {username} = history.location.state
       const {profileImageUrl} = history.location.state
       
      return (
        <div className="modalWrapper">
            <a onClick={this.back.bind(this)} className="close" >Close</a>
            <div className="modalOwn">
                <div className="leftSide">
                    <img src={history.location.state.photoUrl} alt=""/>
                </div>
                <div className="rightSide">
                    <div className="author">
                        <div className="circle"style={{backgroundImage: `url(${profileImageUrl})`}} ></div>
                        <div className="authorName">
                            <p>{username}</p>
                        </div>
                    </div>

                   
                    <ul className="parameters">
                        <li>
                            <FiAperture style={{fontSize:28}}/>-
                           
                        </li>
                        <li>
                            <i>Icon2</i>-
                         
                        </li>
                        <li>
                            <i>Icon3</i>-
                            
                        </li>
                        <li>
                            <i>Icon4</i>-
                            
                        </li>
                        <li>
                            <i>Icon5</i>-
                            
                        </li>
                    </ul>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input value={newComment} onChange={this.handleChange.bind(this)}type="text"/>
                        <button type="submit">Submit</button>
                    </form>
                    <ul className="comments">
                        {items && items.map(x=><Comment profileImage={x.profileImageUrl}message={x.message} username={x.username}/>)}
                    </ul>
                </div>
                

                

            </div>
        </div>
      );
    }
  }

function mapState(state) {
    const {profiles, comments} = state
    const {profile} = profiles
    const {items} = comments
    
    return {profile, items}
}
const actionCreators = {
    getComments: commentActions.getComments,
    postComment: commentActions.addComment
 
}
const connectedModal = connect(mapState, actionCreators)(Modal);
export { connectedModal as Modal };
