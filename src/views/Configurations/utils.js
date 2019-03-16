
export default class Validator {

    filterCountry = ( data ) =>{
      const array = []    
        data.map( country => {
            array.push({
                id: country.id,
                name:country.name,
                provinces: country.provinces 
           })
        })
        
        return array.length < 1 ? [] : array
    }

}