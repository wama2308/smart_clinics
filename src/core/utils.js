import jwt_decode from "jwt-decode";

export const filterDirectionExact = (data, callback) => {
  const payload = {};
  data[0].address_components
    ? data[0].address_components.map(ubication => {
        ubication.types.map(type => {
          switch (type) {
            case "administrative_area_level_1": {
              payload.province = ubication.long_name;
            }
            case "country": {
              payload.country = ubication.long_name;
            }
          }
        });
      })
    : [];

  callback(payload);
};

export const getIdMedicalCenter = () => {
  const token = localStorage.getItem("id_token");
  const decode = jwt_decode(token);
  console.log("id decode", decode.id);
  return decode.id;
};

export const filterProvinces = (countrys, selected) => {
  if (!countrys) {
    return;
  }
  const result = countrys.find(country => country.value.includes(selected));
  return result.provinces;
};

const formatValor = (campo, preformat) => {
  var vr = campo.value;

  //vr = vr.replace( ".", "" );

  vr = replaceAll(vr, ",");

  vr = replaceAll(vr, ".");

  campo.value = "";

  var sign = "";

  if (vr.indexOf("-") !== -1) {
    vr = replaceAll(vr, "-");

    sign = "-";
  }

  var tam = preformat ? vr.length : vr.length + 1;

  campo.maxLength = 13;

  if (tam <= 2) {
    campo.value = "0." + vr;
  }

  if (tam > 2 && tam <= 5) {
    campo.maxLength = 13;
    campo.value = vr.substr(0, tam - 2) + "." + vr.substr(tam - 2, tam);
  }

  if (tam >= 6 && tam <= 8) {
    campo.maxLength = 13;
    campo.value =
      vr.substr(0, tam - 5) +
      "," +
      vr.substr(tam - 5, 3) +
      "." +
      vr.substr(tam - 2, tam);
  }

  if (tam >= 9 && tam <= 11) {
    campo.maxLength = 14;
    campo.value =
      vr.substr(0, tam - 8) +
      "," +
      vr.substr(tam - 8, 3) +
      "," +
      vr.substr(tam - 5, 3) +
      "." +
      vr.substr(tam - 2, tam);
  }

  if (tam >= 12 && tam <= 14) {
    campo.maxLength = 21;
    campo.value =
      vr.substr(0, tam - 11) +
      "," +
      vr.substr(tam - 11, 3) +
      "," +
      vr.substr(tam - 8, 3) +
      "," +
      vr.substr(tam - 5, 3) +
      "." +
      vr.substr(tam - 2, tam);
  }

  /*if ( (tam >= 15) && (tam <= 17) ){
            console.log(6)
            campo.maxLength = 22;
            campo.value = vr.substr( 0, tam - 14 ) + ',' + vr.substr( tam - 14, 3 ) + ',' + vr.substr( tam - 11, 3 ) + ',' + vr.substr( tam - 8, 3 ) + ',' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;
            console.log("6 tam ",tam)
            console.log("6 campo.value ",campo.value)
        }*/

  var pos = campo.value.indexOf(".");

  if (pos !== -1) {
    vr = campo.value.substr(0, pos);

    if (vr === "00" || (vr.length === 2 && vr.substr(0, 1) === "0"))
      campo.value = campo.value.substr(1, tam);
  }

  campo.value = sign + campo.value;
};

const replaceAll = (value, charte) => {
  var result = value;

  var posi = value.indexOf(charte);

  if (posi > -1) {
    while (posi > -1) {
      result = value.substring(0, posi);

      result = result + value.substring(posi + 1);

      posi = result.indexOf(charte);

      value = result;
    }
  }
  return result;
};

export const enterDecimal = elEvento => {
  var amountformat = true;
  var event = elEvento || window.event;
  var elem = event.currentTarget || event.srcElement;
  var kcode = event.which || event.keyCode;
  //alert(kcode);
  var val;
  var newVal = "";
  if (amountformat) elem.value = replaceAll(elem.value, ".");
  switch (kcode) {
    case 66:
    case 98: {
      if (amountformat) formatValor(elem, true);
      //break;
      return false;
    }
    case 72:
    case 104: {
      if (amountformat) formatValor(elem, true);
      //break;
      return false;
    }
    case 77:
    case 109: {
      if (amountformat) formatValor(elem, true);
      //break;
      return false;
    }
    case 84:
    case 116: {
      if (amountformat) formatValor(elem, true);
      //break;
      return false;
    }
    default: {
      if (amountformat) {
        if ((kcode < 48 || kcode > 57) && kcode !== 13) {
          if (kcode === 37 || kcode === 39) {
            //event.returnValue = true;
            //formatValor(elem,true);
            return true;
          } else if (kcode === 8) {
            //event.returnValue = true;
            //formatValor(elem,true);
            if (
              elem.value === "0" ||
              elem.value === "00" ||
              elem.value === "0.00" ||
              elem.value === "0.00" ||
              elem.value === ""
            ) {
              elem.value = "0.00";
            }
            return true;
          } else {
            event.preventDefault();
          }
          //break;
        } else if (kcode !== 13) {
          formatValor(elem, false);
          //break;
          return true;
        } else {
          formatValor(elem, true);
          if (
            elem.value === "0" ||
            elem.value === "00" ||
            elem.value === "0.00" ||
            elem.value === "0.00" ||
            elem.value === ""
          ) {
            elem.value = "0.00";
          }
          //break;
          return true;
        }
      } else {
        if ((kcode < 48 || kcode > 57) && kcode !== 13) {
          //event.returnValue = false;
          return false;
        } else if (kcode === 46 && elem.value.indexOf(".") !== -1) {
          //event.returnValue = false;
          return false;
        }
      }
    }
  }
};

export const number_format = (amount, decimals) => {
  amount += ""; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

  decimals = decimals || 0; // por si la variable no fue fue pasada

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = "" + amount.toFixed(decimals);

  var amount_parts = amount.split("."),
    regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

  return amount_parts.join(".");
};

export const formatNumber = x => {
  const result = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return result;
};

export const GetDisabledPermits = (permits, type) => {
  let disabled = true;

  permits.map(permit => {
    if (permit === type) {
      disabled = false;
    }
  });

  return disabled;
};

export const getArray = (props) => {
  const ArrayData = []
  props.map((data, key) => {
    ArrayData.push({
      ...data, number: key + 1
    })
  })
  return ArrayData;
}
