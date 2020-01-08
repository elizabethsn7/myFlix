// client/src/index.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MainView } from "./components/main-view/main-view";
import moviesApp from "./reducers/reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const store = createStore(moviesApp);

//Main component (will eventually uou all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
