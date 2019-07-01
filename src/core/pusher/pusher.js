import Pusher from "pusher-js";
import { SetDataSave } from '../../actions/configAction'
import { loadRolNewPusher } from '../../actions/UserAction'
import { loadRolEditPusher } from '../../actions/UserAction'
import { loadRolDisabledPusher } from '../../actions/UserAction'
import { loadRolEnabledPusher } from '../../actions/UserAction'

const pusher = new Pusher("34e5435919b3fe059eec", {
  cluster: "us2",
  encrypted: true
});

const branchOffice = pusher.subscribe("branchoffices");
const rol = pusher.subscribe("rol");

export default class PusherApi {
  constructor(dispatch) {
    this.store = dispatch;
    this.executeAllPusher();
  }

  executeAllPusher() {

    branchOffice.bind('save', data => {
      this.store.dispatch(SetDataSave(data))
    });

    rol.bind('save', data => {
      this.store.dispatch(loadRolNewPusher(data))
    });

    rol.bind('edit', data => {
      this.store.dispatch(loadRolEditPusher(data))
    });

    rol.bind('disabled', data => {
      this.store.dispatch(loadRolDisabledPusher(data))
    });

    rol.bind('enabled', data => {
      this.store.dispatch(loadRolEnabledPusher(data))
    });

  }
}
