import {photoConstants} from '../_constants'

export function photos(state={}, action){
    switch(action.type){
        case photoConstants.GET_PHOTOS_REQUEST:
            return{
                photosLoading: true
            }
        case photoConstants.GET_ALL_PHOTOS_REQUEST:
            return{
                photosLoading: true
            }
        case photoConstants.GET_PHOTOS_SUCCESS:
            return{
                items: action.photos
            }
        case photoConstants.GET_ALL_PHOTOS_SUCCESS:
            return{
                items:action.photos
            }
        case photoConstants.GET_PHOTOS_FAILURE:
            return{
                error: action.error
            }
        case photoConstants.GET_ALL_PHOTOS_FAILURE:
            return{
                error: action.error
            }

        case photoConstants.ADD_PHOTO_REQUEST:
            return{
                photoAdding: true
            }
        case photoConstants.ADD_PHOTO_SUCCESS:
            return{
                user: action.user
            }
            
        case photoConstants.ADD_PHOTO_FAILURE:
            return{
                error: action.error
            }
        default:
            return state

    }
}