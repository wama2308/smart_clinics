import Pusher from "pusher-js";
import {
  SetDataSave,
  enableBranchs,
  disabledBranchs
} from "../../actions/configAction";
import { loadRolNewPusher } from "../../actions/UserAction";
import { loadRolEditPusher } from "../../actions/UserAction";
import { loadRolDisabledPusher } from "../../actions/UserAction";
import { loadRolEnabledPusher } from "../../actions/UserAction";
import { loadProviderNewPusher } from "../../actions/DistributorActions";
import { loadProviderEditPusher } from "../../actions/DistributorActions";
import { loadProviderDisabledPusher } from "../../actions/DistributorActions";
import { loadProviderEnabledPusher } from "../../actions/DistributorActions";
import { loadPositionsNewPusher } from "../../actions/PersonalInternoActions";
import { loadPositionsEditPusher } from "../../actions/PersonalInternoActions";
import { loadPositionsDisabledPusher } from "../../actions/PersonalInternoActions";
import { loadPositionsEnabledPusher } from "../../actions/PersonalInternoActions";
import { loadInternalStaffNewPusher } from "../../actions/PersonalInternoActions";
import { loadInternalStaffEditPusher } from "../../actions/PersonalInternoActions";
import { loadInternalStaffDisabledPusher } from "../../actions/PersonalInternoActions";
import { loadInternalStaffEnabledPusher } from "../../actions/PersonalInternoActions";
import { loadUserNoMasterNewPusher } from "../../actions/UserAction";
import { loadUserNoMasterEditPusher } from "../../actions/UserAction";
import { loadUserNoMasterDisabledPusher } from "../../actions/UserAction";
import { loadUserNoMasterEnabledPusher } from "../../actions/UserAction";
import { loadStoreNewPusher } from "../../actions/StoreActions";
import { loadStoreEditPusher } from "../../actions/StoreActions";
import { loadStoreDisabledPusher } from "../../actions/StoreActions";
import { loadStoreEnabledPusher } from "../../actions/StoreActions";
import { loadStoreShopNewPusher } from "../../actions/ShopActions";
import { loadStoreShopEditPusher } from "../../actions/ShopActions";
import { loadStoreShopDisabledPusher } from "../../actions/ShopActions";
import { loadStoreTransferNewPusher } from "../../actions/ShopActions";
import { loadStoreTransferEditPusher } from "../../actions/ShopActions";
import { loadStoreTransferDisabledPusher } from "../../actions/ShopActions";
import { loadStoreTransferAcceptPusher } from "../../actions/ShopActions";
import { loadStoreTransferRejectPusher } from "../../actions/ShopActions";
import { loadStoreTransferReceivedSavePusher } from "../../actions/ShopActions";
import { loadStoreTransferReceivedEditPusher } from "../../actions/ShopActions";
import { loadStoreTransferReceivedDisabledPusher } from "../../actions/ShopActions";
import { loadStoreTransferReceivedAcceptPusher } from "../../actions/ShopActions";
import { loadStoreTransferReceivedRejectPusher } from "../../actions/ShopActions";

const pusher = new Pusher("34e5435919b3fe059eec", {
  cluster: "us2",
  encrypted: true
});

const branchOffice = pusher.subscribe("branchoffices");
const rol = pusher.subscribe("rol");
const provider = pusher.subscribe("provider");
const positions = pusher.subscribe("positions");
const internal_staff = pusher.subscribe("internal_staff");
const user_no_master = pusher.subscribe("user_no_master");
const store_branchoffices = pusher.subscribe("store_branchoffices");
const shop = pusher.subscribe("shop");
const transfer_received = pusher.subscribe("transfer_received");
const transfer = pusher.subscribe("transfer");

export default class PusherApi {
  constructor(dispatch) {
    this.store = dispatch;
    this.executeAllPusher();
  }

  executeAllPusher() {
    branchOffice.bind("save", data => {
      this.store.dispatch(SetDataSave(data));
    });

    branchOffice.bind("disabled", data => {
      console.log("disabled", data);
      this.store.dispatch(enableBranchs(data));
    });

    branchOffice.bind("enabled", data => {
      console.log("enabled", data);
      this.store.dispatch(disabledBranchs(data));
    });

    rol.bind("save", data => {
      this.store.dispatch(loadRolNewPusher(data));
    });

    rol.bind("edit", data => {
      this.store.dispatch(loadRolEditPusher(data));
    });

    rol.bind("disabled", data => {
      this.store.dispatch(loadRolDisabledPusher(data));
    });

    rol.bind("enabled", data => {
      this.store.dispatch(loadRolEnabledPusher(data));
    });

    provider.bind("save", data => {
      this.store.dispatch(loadProviderNewPusher(data));
    });

    provider.bind("edit", data => {
      this.store.dispatch(loadProviderEditPusher(data));
    });

    provider.bind("disabled", data => {
      this.store.dispatch(loadProviderDisabledPusher(data));
    });

    provider.bind("enabled", data => {
      this.store.dispatch(loadProviderEnabledPusher(data));
    });

    positions.bind("save", data => {
      this.store.dispatch(loadPositionsNewPusher(data));
    });

    positions.bind("edit", data => {
      this.store.dispatch(loadPositionsEditPusher(data));
    });

    positions.bind("disabled", data => {
      this.store.dispatch(loadPositionsDisabledPusher(data));
    });

    positions.bind("enabled", data => {
      this.store.dispatch(loadPositionsEnabledPusher(data));
    });

    internal_staff.bind("save", data => {
      this.store.dispatch(loadInternalStaffNewPusher(data));
    });

    internal_staff.bind("edit", data => {
      this.store.dispatch(loadInternalStaffEditPusher(data));
    });

    internal_staff.bind("disabled", data => {
      this.store.dispatch(loadInternalStaffDisabledPusher(data));
    });

    internal_staff.bind("enabled", data => {
      this.store.dispatch(loadInternalStaffEnabledPusher(data));
    });

    user_no_master.bind("save", data => {
      this.store.dispatch(loadUserNoMasterNewPusher(data));
    });

    user_no_master.bind("edit", data => {
      this.store.dispatch(loadUserNoMasterEditPusher(data));
    });

    user_no_master.bind("disabled", data => {
      this.store.dispatch(loadUserNoMasterDisabledPusher(data));
    });

    user_no_master.bind("enabled", data => {
      this.store.dispatch(loadUserNoMasterEnabledPusher(data));
    });

    store_branchoffices.bind("save", data => {
      this.store.dispatch(loadStoreNewPusher(data));
    });

    store_branchoffices.bind("edit", data => {
      this.store.dispatch(loadStoreEditPusher(data));
    });

    store_branchoffices.bind("disabled", data => {
      this.store.dispatch(loadStoreDisabledPusher(data));
    });

    store_branchoffices.bind("enabled", data => {
      this.store.dispatch(loadStoreEnabledPusher(data));
    });

    shop.bind("save", data => {
      this.store.dispatch(loadStoreShopNewPusher(data));
    });

    shop.bind("edit", data => {
      this.store.dispatch(loadStoreShopEditPusher(data));
    });

    shop.bind("disabled", data => {
      this.store.dispatch(loadStoreShopDisabledPusher(data));
    });

    transfer.bind("save", data => {
      this.store.dispatch(loadStoreTransferNewPusher(data));
    });

    transfer.bind("edit", data => {
      this.store.dispatch(loadStoreTransferEditPusher(data));
    });

    transfer.bind("disabled", data => {
      this.store.dispatch(loadStoreTransferDisabledPusher(data));
    });

    transfer.bind("accept", data => {
      this.store.dispatch(loadStoreTransferAcceptPusher(data));
    });

    transfer.bind("reject", data => {
      this.store.dispatch(loadStoreTransferRejectPusher(data));
    });

    transfer_received.bind("save", data => {
      this.store.dispatch(loadStoreTransferReceivedSavePusher(data));
    });

    transfer_received.bind("edit", data => {
      this.store.dispatch(loadStoreTransferReceivedEditPusher(data));
    });

    transfer_received.bind("disabled", data => {
      this.store.dispatch(loadStoreTransferReceivedDisabledPusher(data));
    });

    transfer_received.bind("accept", data => {
      this.store.dispatch(loadStoreTransferReceivedAcceptPusher(data));
    });

    transfer_received.bind("reject", data => {
      this.store.dispatch(loadStoreTransferReceivedRejectPusher(data));
    });
  }
}
