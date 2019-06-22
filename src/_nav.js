const dashboard = {
  name: "Panel",
  url: "/dashboard",
  icon: "icon-layers",
  badge: {
    variant: "info",
    text: "NEW"
  }
};

const configuration = {
  name: "Configuracion",
  url: "/buttons",
  icon: "icon-settings",
  children: [
    {
      name: "Centro Medico",
      url: "/configuration/Medical-center",
      icon: "fa fa-hospital-o"
    },
    {
      name: "Usuarios",
      url: "/configuration/Users",
      icon: "fa fa-group"
    },
    {
      name: "Personal-Cargos",
      url: "/configuration/Personal",
      icon: "fa fa-user-circle"
    },
    {
      name: "Servicios",
      url: "/configuration/Services",
      icon: "icon-puzzle"
    },
    {
      name: "Personal Externo",
      url: "/configuration/personalExterno",
      icon: "fa fa-user-circle-o"
    },
    {
      name: "Proveedor",
      url: "/configuration/Proveedor",
      icon: "fa fa-user-circle-o"
    },
    {
      name: "Almacen",
      url: "/configuration/store",
      icon: "fa fa-home"
    }
  ]
};

const administrativo = {
  name: "Administrativo",
  url: "/buttons",
  icon: "fa fa-book",
  children: [
    {
      name: "Ventas",
      url: "/administrative/sales",
      icon: "fa fa-usd"
    },
    {
      name: "Compras-Productos",
      url: "/administrative/shops",
      icon: "fa fa-shopping-cart"
    },

    {
      name: "Pacientes",
      url: "/administrative/patients",
      icon: "fas fa-id-card-alt"
    }
  ]
};

export const getMenu = obj => {
  return { items: obj };
};
