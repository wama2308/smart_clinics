import Pusher from "pusher-js";
import { SetDataSave } from '../../actions/configAction'
const pusher = new Pusher("34e5435919b3fe059eec", {
  cluster: "us2",
  encrypted: true
});

const branchOffice = pusher.subscribe("branchoffices");

export default class PusherApi {
  constructor(dispatch) {
    this.store = dispatch;
    this.executeAllPusher();
  }

  executeAllPusher() {

    branchOffice.bind('save', data => {
      this.store.dispatch(SetDataSave(data))
    });


  }
}
