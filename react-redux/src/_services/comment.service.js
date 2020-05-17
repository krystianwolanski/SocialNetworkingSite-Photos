import config from 'config'
import { authHeader } from '../_helpers';

export const commentService = {
    getCommentsPhoto,
    addComment
}

function getCommentsPhoto(photoId){
    const requestOptions={
        method: 'GET'
    }
    return fetch(`${config.apiUrl}/comments/photo/${photoId}`, requestOptions).then(handleResponse)
}
function addComment(message, profilephotoid){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({message, profilephotoid}),
        
    }

    console.log(requestOptions)

    return fetch(`${config.apiUrl}/comments`, requestOptions).then(handleResponse)
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else if(response.status === 204){
            
            const error = response.statusText
            return Promise.reject(error)
        }
        return data;
    });
}