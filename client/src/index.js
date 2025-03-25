import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import store from './state/store';
import {BrowserRouter as Router} from "react-router-dom"
import ThemeProviderWrapper from "./theme/ThemeContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
       <ThemeProviderWrapper>
    <App />
    </ThemeProviderWrapper>
      </Provider>
    </Router>
  </React.StrictMode>
);


