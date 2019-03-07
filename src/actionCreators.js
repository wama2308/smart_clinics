const openModalUser = (valor, opcion) => {
	return {
      type:"OPEN_MODAL_USER",
      valor,
      opcion: opcion
    };
};

const openModalUserView = (valor, opcion, userId) => {
	return {
      type:"OPEN_MODAL_USER_VIEW",
      valor,
      opcion:opcion,
      userId: userId
    };
};

const openModalUserEdit = (valor, opcion, userId) => {
  return {
      type:"OPEN_MODAL_USER_EDIT",
      valor,
      opcion:opcion,
      userId: userId
    };
};

export { openModalUser, openModalUserView, openModalUserEdit };