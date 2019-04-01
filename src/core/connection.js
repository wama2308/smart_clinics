
export const url = `http://smartclinics.online/sc-admin/web/app.php`;
// const url =`http://192.168.1.127:8000`


export const getDataToken = () => {
  return new Promise(resolve => {
    const token = window.localStorage.getItem("id_token");
    const datos = {
      headers: { "access-token": token }
    };
    resolve(datos);
  });
};
