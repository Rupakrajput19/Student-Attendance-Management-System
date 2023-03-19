export const userAdminCheck = (IsAdmin) => {
    return (dispatch)=>{
        dispatch({
            type: 'checkIsAdmin',
            payload: IsAdmin
        })
    }
}