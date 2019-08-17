//export const url = `http://35.198.5.148/sc-admin/web/app.php`;
export const url = `http://192.168.0.119:8000`;

export const getDataToken = () => {
  return new Promise(resolve => {
    const token = window.localStorage.getItem("id_token");
    const datos = {
      headers: { "access-token": token }
    };
    resolve(datos);
  });
};
