import {profileConstants} from '../_constants'
import {profileService} from '../_services'

export const profileActions={
    getProfile,
}

function getProfile(username){
    return dispatch=>{
        dispatch(request(username))

        profileService.getProfile(username)
            .then(
                profile => dispatch(success(profile)),
                error => dispatch(failure(error.toString()))
                
            )
    }

    function request(username){return {type: profileConstants.GET_PROFILE_REQUEST, username}}
    function success(profile){return {type: profileConstants.GET_PROFILE_SUCCESS, profile}}
    function failure(error){return {type: profileConstants.GET_PROFILE_FAILURE, error}}
}

