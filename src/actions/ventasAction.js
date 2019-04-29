import {getDataToken,url} from '../core/connection'
import {data} from '../views/Ventas/mockData'

export const searchPatient = (searchData) => dispatch => {
   dispatch({
     type:'SEARCH_PATIENT',
     payload: data
   })
}

