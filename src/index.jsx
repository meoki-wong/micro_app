import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import microApp from '@micro-zoe/micro-app'
import { BrowserRouter } from 'react-router-dom';


const apps = [
  {
    name: 'first-name',
    entry: 'http://localhost:8080/',
    container: '#app',
    baseroute: '/'
  }
]
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

microApp.start({apps})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
