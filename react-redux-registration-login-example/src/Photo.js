import React from 'react'
import {Modal} from './Modal'
import {Link, useLocation} from 'react-router-dom'

export class Photo extends React.Component{
    constructor(props){
        super(props)

    
       
    }

    render(){
        
        return(
            <div>
            
                {<Link key={this.props.photo.Id} to={{pathname: '/muc'}}><div className="card"><img src={this.props.photo.imageUrl} /></div></Link>}

            </div>
        )
    }
}