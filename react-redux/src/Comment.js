import React from 'react'


export default function Comment({message, username, profileImage}){
   
    return(
        <li className="comment">
            <div className="commentCircle" style={{backgroundImage: `url(${profileImage})`}}></div>
            <p><b>{username}</b> {message}</p>
        </li>
    )
}

