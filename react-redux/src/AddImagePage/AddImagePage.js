import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import {photoActions} from '../_actions'
import { connect } from 'react-redux';


class AddImagePage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            photo:''
        }
    }

    handleChange(event) {
        const{files} = event.target;

        this.setState({photo: files[0]})
    }
    handleSubmit(event) {
        event.preventDefault()   
        const {photo} = this.state
        const formData = new FormData();
        formData.append('photo',photo)
        console.log(formData.get('photo').name)
        if(formData){
            this.props.addPhoto(formData)
        }
        
    }
    render(){

        if(localStorage.getItem('user')) {
            return(

                <form className="formAddPhoto" onSubmit={this.handleSubmit.bind(this)}>
                    <Input onChange={this.handleChange.bind(this)} type="file"/>
                    <button type="submit">Add Photo</button>
                </form>
        )
        }

    }
}

function mapState(state) {
    const { photoAdding } = state.photos;
    return { photoAdding };
}

const actionCreators = {
    addPhoto: photoActions.addPhoto
};

const connectedAddImagePage = connect(mapState, actionCreators)(AddImagePage);
export {connectedAddImagePage as AddImagePage };