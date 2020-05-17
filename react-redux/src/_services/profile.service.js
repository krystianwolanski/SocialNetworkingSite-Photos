import config from 'config';

export const profileService={
    getProfile
}

function getProfile(id){
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/profiles/${id}`, requestOptions).then(handleResponse);
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