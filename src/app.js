import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

import configureStore from "./redux/store";

import Layout from "./components/layouts/layout.react";

const initialState = {};
const reduxStore = configureStore( initialState );
window.redixStore = reduxStore;

const app = document.getElementById( "app" );

const App = withRouter( Layout );

ReactDOM.render(
    <ReduxProvider store={ reduxStore }>
        <Router>
            <App />
        </Router>
    </ReduxProvider>,
    app
);
