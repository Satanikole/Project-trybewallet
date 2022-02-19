import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@material-ui/core';
import App from './App';
import * as serviceWorker from './serviceWorker';
import STORE from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#5dd39e',
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={ theme }>
      <Provider store={ STORE }>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
