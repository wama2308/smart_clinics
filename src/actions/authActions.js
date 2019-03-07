import authState from '../state/authState'
import AuthService from '../core/auth/AuthService'

const auth = new AuthService(['http://smartclinics.online/sc-admin/web/app.php/api/','http://localhost:8000/api/'])
export function setState() {
    return {
      type: 'SETSTATE',
      payload:authState
    }
}

export const login = (data) => dispatch =>{
    auth.login(data.user , data.password, (data)=>{
        console.log(data)
    })
}