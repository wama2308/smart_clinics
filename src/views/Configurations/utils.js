
export default class Validator {

    filterCountry = ( data , callback ) =>{
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


    filterProvinces = (countries, selectedCountry) => {
        const array = countries.filter(countries => {
          return countries.id.includes(selectedCountry);
        });
        const provinces = array.length !== 0 ? array[0].provinces : [];
    
        return provinces;
    };

}