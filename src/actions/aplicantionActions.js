
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


export const outsideClick = ()=>{
  return {
    type:'OUT_CLICK',
    payload:true
  }
}



export const insideClick = ()=>{
  return {
    type:'OUT_CLICK',
    payload: false  
  }
}



export const search =(data)=>{
  return {
   type:'SEARCH',
   payload: data
  }
}