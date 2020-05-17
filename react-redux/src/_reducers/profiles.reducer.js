import {profileConstants} from '../_constants'

export function profiles(state={}, action){
    switch(action.type){
        case profileConstants.GET_PROFILE_REQUEST:
            return{
                profileLoading:true,
            }
        case profileConstants.GET_PROFILE_SUCCESS:
            return{
                profile: action.profile
            }
        case profileConstants.GET_PROFILE_FAILURE:
            return{
                error: action.error
            }
        default:
            return state
    }
}