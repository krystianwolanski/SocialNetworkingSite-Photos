import {profileService, photoService} from '../_services'
import {photoConstants} from '../_constants'
import { history } from '../_helpers';

export const photoActions={
    getAllPhotos,
    getPhotos,
    addPhoto
}
function getAllPhotos(){
    return dispatch => {
        dispatch(request())

        photoService.getAllPhotos()
            .then(
                photos=>dispatch(success(photos)),
                error => dispatch(failure(error))
            )
        }

    function request(){ return {type: photoConstants.GET_ALL_PHOTOS_REQUEST}}
    function success(photos){ return {type: photoConstants.GET_ALL_PHOTOS_SUCCESS, photos}}
    function failure(error){ return {type: photoConstants.GET_ALL_PHOTOS_FAILURE, error}}

}
function getPhotos(username){
    return dispatch => {
        dispatch(request(username))

        photoService.getPhotos(username)
            .then(
                photos=>dispatch(success(photos)),
                error => dispatch(failure(error))
            )
        }

    function request(username){ return {type: photoConstants.GET_PHOTOS_REQUEST, username}}
    function success(photos){ return {type: photoConstants.GET_PHOTOS_SUCCESS, photos}}
    function failure(error){ return {type: photoConstants.GET_PHOTOS_FAILURE, error}}

}

function addPhoto(photo){
    return dispatch => {
        dispatch(request())

        photoService.addPhoto(photo)
            .then(
                user =>{
                    dispatch(success(user))
                    history.push('/')
                }, 
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: photoConstants.ADD_PHOTO_REQUEST } }
    function success(user) { return {type: photoConstants.ADD_PHOTO_SUCCESS, user } }
    function failure(error) { return {type: photoConstants.ADD_PHOTO_FAILURE, error} }
}