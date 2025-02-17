import React from "react";
import Loadable from "react-loadable";
import withAuth from "./components/withAuth";
import DefaultHeader from "./containers/DefaultLayout/DefaultHeader";
import DefaultLayout from "./containers/DefaultLayout";
import configContainer from "./containers/configContainer";
import UserContainer from "./containers/UsersContainer";
import DistributorContainers from "./containers/DistributorContainers";
import servicesContainer from "./containers/servicesContainer";
import ExternalContainer from "./containers/externalContainer";
import PersonalInternoContainers from "./containers/PersonalInternoContainers";
import ventasContainer from "./containers/ventasContainer";
import StoreContainer from "./containers/StoreContainer";
import ShopContainers from "./containers/ShopContainers";
import PatientContainer from "./containers/patientContainer";
import ConfigComisionesContainer from "./containers/ConfigComisionesContainer";
import Calendar from "./containers/CalendarContainer";

import Dashboard from "./views/Dashboard";
import ReclamosContainer from "./containers/ReclamosContainer";
import TurnosContainer from "./containers/TurnosContainer";
import BedroomsContainer from "./containers/BedroomsContainer";
import TransferContainer from "./containers/TransferContainer";

function Loading() {
  return <div>Loading...</div>;
}

const Breadcrumbs = Loadable({
  loader: () => import("./views/Base/Breadcrumbs"),
  loading: Loading
});

const Cards = Loadable({
  loader: () => import("./views/Base/Cards"),
  loading: Loading
});

const Carousels = Loadable({
  loader: () => import("./views/Base/Carousels"),
  loading: Loading
});

const Collapses = Loadable({
  loader: () => import("./views/Base/Collapses"),
  loading: Loading
});

const Dropdowns = Loadable({
  loader: () => import("./views/Base/Dropdowns"),
  loading: Loading
});

const Forms = Loadable({
  loader: () => import("./views/Base/Forms"),
  loading: Loading
});

const Jumbotrons = Loadable({
  loader: () => import("./views/Base/Jumbotrons"),
  loading: Loading
});

const ListGroups = Loadable({
  loader: () => import("./views/Base/ListGroups"),
  loading: Loading
});

const Navbars = Loadable({
  loader: () => import("./views/Base/Navbars"),
  loading: Loading
});

const Navs = Loadable({
  loader: () => import("./views/Base/Navs"),
  loading: Loading
});

const Paginations = Loadable({
  loader: () => import("./views/Base/Paginations"),
  loading: Loading
});

const Popovers = Loadable({
  loader: () => import("./views/Base/Popovers"),
  loading: Loading
});

const ProgressBar = Loadable({
  loader: () => import("./views/Base/ProgressBar"),
  loading: Loading
});

const Switches = Loadable({
  loader: () => import("./views/Base/Switches"),
  loading: Loading
});

const Tables = Loadable({
  loader: () => import("./views/Base/Tables"),
  loading: Loading
});

const Tabs = Loadable({
  loader: () => import("./views/Base/Tabs"),
  loading: Loading
});

const Tooltips = Loadable({
  loader: () => import("./views/Base/Tooltips"),
  loading: Loading
});

const BrandButtons = Loadable({
  loader: () => import("./views/Buttons/BrandButtons"),
  loading: Loading
});

const ButtonDropdowns = Loadable({
  loader: () => import("./views/Buttons/ButtonDropdowns"),
  loading: Loading
});

const ButtonGroups = Loadable({
  loader: () => import("./views/Buttons/ButtonGroups"),
  loading: Loading
});

const Buttons = Loadable({
  loader: () => import("./views/Buttons/Buttons"),
  loading: Loading
});

const Charts = Loadable({
  loader: () => import("./views/Charts"),
  loading: Loading
});

const CoreUIIcons = Loadable({
  loader: () => import("./views/Icons/CoreUIIcons"),
  loading: Loading
});

const Flags = Loadable({
  loader: () => import("./views/Icons/Flags"),
  loading: Loading
});

const FontAwesome = Loadable({
  loader: () => import("./views/Icons/FontAwesome"),
  loading: Loading
});

const SimpleLineIcons = Loadable({
  loader: () => import("./views/Icons/SimpleLineIcons"),
  loading: Loading
});

const Alerts = Loadable({
  loader: () => import("./views/Notifications/Alerts"),
  loading: Loading
});

const Badges = Loadable({
  loader: () => import("./views/Notifications/Badges"),
  loading: Loading
});

const Modals = Loadable({
  loader: () => import("./views/Notifications/Modals"),
  loading: Loading
});

const Colors = Loadable({
  loader: () => import("./views/Theme/Colors"),
  loading: Loading
});

const Typography = Loadable({
  loader: () => import("./views/Theme/Typography"),
  loading: Loading
});

const Widgets = Loadable({
  loader: () => import("./views/Widgets/Widgets"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: "/",
    exact: true,
    name: "Inicio",
    component: DefaultLayout
  },
  {
    path: "/dashboard",
    name: "Panel",
    component: Dashboard
  },

  {
    path: "/configuration",
    exact: true,
    name: "Configuracion",
    component: configContainer
  },
  {
    path: "/configuration/Medical-center",
    name: "Centro Medico",
    component: configContainer
  },
  {
    path: "/configuration/personalExterno",
    name: "Personal Externo",
    component: ExternalContainer
  },
  {
    path: "/configuration/Users",
    name: "Usuarios",
    component: UserContainer
  },
  {
    path: "/configuration/Proveedor",
    name: "Proveedor",
    component: DistributorContainers
  },
  {
    path: "/configuration/Personal",
    name: "Personal",
    component: PersonalInternoContainers
  },
  {
    path: "/configuration/Services",
    name: "Servicios",
    component: servicesContainer
  },
  {
    path: "/configuration/store",
    name: "Almacen",
    component: StoreContainer
  },
  { path: "/administrative/sales", name: "Ventas", component: ventasContainer },
  { path: "/administrative/shops", name: "Compras", component: ShopContainers },
  { path: "/administrative/transfer", name: "Transferencias", component: TransferContainer },
  {
    path: "/configuration/commissions",
    name: "Comisiones",
    component: ConfigComisionesContainer
  },
  {
    path: "/administrative/calendar",
    name: "Calendario",
    component: Calendar
  },
  {
    path: "/administrative/patients",
    name: "Informacion de paciente",
    component: PatientContainer
  },
  {
    name: "Reclamos",
    path: "/reclamos/reclamos",
    icon: "fa fa-bullhorn",
    component: ReclamosContainer
  },
  {
    name: "Turnos",
    path: "/turnos/turnos",
    component: TurnosContainer
  },
  {
    name: "Dispensarios",
    path: "/dispensarios/habitaciones",
    component: BedroomsContainer
  },

  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Button Dropdowns",
    component: ButtonDropdowns
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons
  },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons
  },
  {
    path: "/notifications",
    exact: true,
    name: "Notifications",
    component: Alerts
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/charts", name: "Charts", component: Charts }
];

export default routes;
