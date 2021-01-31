import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk';
import { Provider } from "react-redux"
import rootReducer from "./Reducers/Index"
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

