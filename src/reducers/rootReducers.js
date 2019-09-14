import authReducer from "./authReducer";
import configReducer from "./configReducer";
import AplicationReducers from "./aplicationReducer";
import { combineReducers } from "redux";
import serviceReducer from "./serviceReducer";
import externalReducer from "./externalReducer";
import userReducer from "./UsersReducers";
import DistributorReducers from "./DistributorReducers";
import PersonalInternoReducers from "./PersonalInternoReducers";
import VentasReducer from "./ventasReducer";
import StoreReducer from "./StoreReducers";
import ShopReducer from "./ShopReducers";
import ConfigCommissionsReducer from "./CommissionesReducers";
import calendarReducer from "./calendarReducer";
import ReclamosReducer from "./reclamosReducer"
import ChatReducer from "./chatReducer"
import TurnosReducer from "./TurnosReducer";
import bedroomsReducer from "./bedroomsReducers";
import TransferReducer from "./TransferReducers";

export default combineReducers({
  auth: authReducer,
  config: configReducer,
  global: AplicationReducers,
  service: serviceReducer,
  usersRoles: userReducer,
  external: externalReducer,
  distributor: DistributorReducers,
  personaInterno: PersonalInternoReducers,
  store: StoreReducer,
  shop: ShopReducer,
  ventas: VentasReducer,
  configCommissions: ConfigCommissionsReducer,
  calendar: calendarReducer,
  reclamos: ReclamosReducer,
  chat: ChatReducer,
  configTurnos: TurnosReducer,
  bedrooms: bedroomsReducer,
  transfer: TransferReducer
});
