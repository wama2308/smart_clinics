
export const openSnackbars=(type, message)=>{
    return {
        type:'OPEN_SNACKBARS',
        payload:{
           type,
           message,
           open:true 
        }
    }
}


export const closeSnackbars = ()=>{
    return {
        type:'CLOSE_SNACKBARS',
    } 
}