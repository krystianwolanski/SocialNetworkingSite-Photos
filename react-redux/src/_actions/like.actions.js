export const likeActions={
    getAllLikes
}

function getAllLikes(){
    return dispatch => {
        dispatch(request())

        likeService.getAllLikes()
            .then(
                likes => dispatch(success(likes)),
                error => dispatch(failure(error))
            )
    }

    
}