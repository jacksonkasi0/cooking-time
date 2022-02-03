import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {createStore,combineReducers} from 'redux'
import { Provider } from "react-redux";
import changeRecipe from "./store/reducer/recipeId";
import changeAPiKey from "./store/reducer/updateApi"


//  store
const rootReducer = combineReducers({
  recipeId_Data:changeRecipe,
  apiKey_Data:changeAPiKey,
}) 
const store = createStore(rootReducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <Router>
      <App />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
