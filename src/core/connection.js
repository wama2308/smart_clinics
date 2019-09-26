//export const url = `http://35.198.5.148/sc-admin/web/app.php`;
export const url = `http://192.168.1.121:8000`;
//export const url = `http://127.0.0.1:8000`;

export const getDataToken = () => {
  return new Promise(resolve => {
    const token = window.localStorage.getItem("id_token");
    const datos = {
      headers: { "access-token": token }
    };
    resolve(datos);
  });
};
