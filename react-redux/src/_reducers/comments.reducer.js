import {commentConstants} from '../_constants'

export function comments(state={}, action){
    switch(action.type){
        case commentConstants.GET_COMMENTS_PHOTO_REQUEST:
            return{
                commentsLoading: true,
                PhotoId: action.photoId
            }
        case commentConstants.GET_COMMENTS_PHOTO_SUCCESS:
            return{
                items: action.comments
            }
        case commentConstants.GET_COMMENTS_PHOTO_FAILURE:
            return{
                error: action.error
            }

        case commentConstants.ADD_COMMENT_REQUEST:
            return{
                ...state,
                commentAdding: true,
                comment: action.comment,
                PhotoId: action.photoId
            }
        case commentConstants.ADD_COMMENT_SUCCESS:
            const {items} = state
            const {comment} = action

            return{
                items: [...items, comment],
                comment: comment
            }
            
        case commentConstants.ADD_COMMENT_FAILURE:
            return{
                error: action.error
            }
        default:
            return state

    }
}