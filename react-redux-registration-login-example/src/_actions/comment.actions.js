import {commentService} from '../_services'
import {commentConstants} from '../_constants'

export const commentActions={
    getComments,
    addComment
}

function getComments(photoId){
    return dispatch => {
        dispatch(request(photoId))

        commentService.getCommentsPhoto(photoId)
            .then(
                comments=>dispatch(success(comments)),
                error => dispatch(failure(error))
            )
        }

    function request(photoId){ return {type: commentConstants.GET_COMMENTS_PHOTO_REQUEST, photoId}}
    function success(comments){ return {type: commentConstants.GET_COMMENTS_PHOTO_SUCCESS, comments}}
    function failure(error){ return {type: commentConstants.GET_COMMENTS_PHOTO_FAILURE, error}}

}

function addComment(comment, photoId){
    return dispatch => {
        dispatch(request(comment, photoId))

        commentService.addComment(comment, photoId)
            .then(
                comment => dispatch(success(comment)),
                error => dispatch(failure(error))
            )
    }

    function request(comment, photoId) { return { type: commentConstants.ADD_COMMENT_REQUEST, comment, photoId } }
    function success(comment) { return {type: commentConstants.ADD_COMMENT_SUCCESS, comment } }
    function failure(error) { return {type: commentConstants.ADD_COMMENT_FAILURE, error} }
}