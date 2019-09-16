import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import PusherApi from "./core/pusher/pusher";
import { verify} from "./actions/authActions";

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
new PusherApi(store);
store.dispatch(verify());


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,

  document.getElementById("root")
);
// disable ServiceWorker
// registerServiceWorker();
