import authState from '../state/authState'
import AuthService from '../core/auth/AuthService'

// local Url http Request 'http://localhost:8000/api/'

const auth = new AuthService('http://smartclinics.online/sc-admin/web/app.php/')
export function setState() {
    return {
      type: 'SETSTATE',
      payload:authState
    }
}

export const loginAction = (data) => dispatch =>{
    auth.login(data.username , data.password, (data)=>{
        console.log(data)
    })
}