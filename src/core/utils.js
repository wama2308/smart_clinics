import jwt_decode from "jwt-decode";

export const filterDirectionExact = (data) => {
  const payload = {}
  data[0].address_components? data[0].address_components.map(ubication =>{
    ubication.types.map( type =>{
        switch(type){
          case'administrative_area_level_1':{
            payload.province = ubication.long_name
          }

          case'country':{
            payload.country = ubication.long_name
          }
        }
    })
  }):[]

   return payload
}


export const getIdMedicalCenter = ()=>{
 const token =  localStorage.getItem('id_token')
 jwt_decode(token)

 console.log(token)
}
