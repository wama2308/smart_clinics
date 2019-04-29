export default {
  items: [
    {
      name: "Panel",
      url: "/dashboard",
      icon: "icon-layers",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
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
        }
      ]
    },
    ,
    {
      name: "Administrativo",
      url: "/buttons",
      icon: "fa fa-book",
      children: [
        {
          name: "Ventas",
          url: "/administrative/sales",
          icon: "fa fa-usd"
        }
      ]
    }
  ]
};
