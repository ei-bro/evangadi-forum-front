import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import reducer from "./context/reducer";

import initialState from "./context/initialState";
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducer, initialState);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
