

export const filterDirectionExact = (data) => {
  const payload = {}
  data.address_components? data.address_components.map(ubication =>{
    ubication.types.map( type =>{
        switch(type){
          case'route':{
            payload.ruta = ubication.long_name
          }

          case'route':{
            payload.estado = ubication.long_name
          }
        }
    })
  }):[]
}
