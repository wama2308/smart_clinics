
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


export const closeDialog = () => {
  return {
    type:'CLOSE_CONFIRM',
  }
}

export const openConfirmDialog = (message, callback) => {
  return {
    type:'OPEN_CONFIRM',
    payload:{
      message, callback
    }
  }
}
