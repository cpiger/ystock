import './sass/main.scss';
import 'babel-polyfill';
// import 'whatwg-fetch';
// import 'imports?this=>global!exports?global.fetch!whatwg-fetch';
// import request from 'superagent';
import Http from './utils/Http';
import Storage from './utils/Storage';
import Grabber from './utils/Grabber';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import stockReducers from './reducers/stock';

import App from './components/App';


// function httpGet(theUrl)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }

// (async() => {
//   try {
//     var url = "https://tw.stock.yahoo.com/q/bc?s=5478";
//     var header = new Headers();
//     header.append('Accept-Encoding', 'gzip');
//     header.append('Content-encoding', 'gzip');
//     header.append('Content-Type', 'text/html;charset=Big5');
//     var myInit = {
//       headers: header
//     };
//     // var response = await fetch(url, myInit);
//     // var rps = await response.json();
//     // // var rps = httpGet(url);
//     // let parser = new DOMParser();
//     // let doc = parser.parseFromString(rps,"text/html");
//     // var q = doc.querySelector('title').text;
//     // var google = document.createElement('div');
//     // google.innerHTML = q;
//     // document.body.appendChild(google);

//     fetch(url, myInit)
//       .then(function(response) {
//         // Display the key/value pairs
//         for (var pair of response.headers.entries()) {
//           console.log(pair[0]+ ': '+ pair[1]);
//         }        
//         // console.log(response.headers.getAll());
//         return response.text();
//       })
//       .then(function(data) {
//         let parser = new DOMParser();
//         let doc = parser.parseFromString(data,"text/html");
//         var q = doc.querySelector('title').text;
//         var google = document.createElement('div');
//         google.innerHTML = q;
//         document.body.appendChild(google); 
//       });
//   } catch (e) {
//     console.log("Booo");
//     console.log(e);
//   }
// })();


// superagent
// var url = "https://tw.stock.yahoo.com/q/bc?s=5478";

// var stor = new Storage('chrome');
// // var req = new Http();

// stor.get_async('test', function(item) {
//   if (item) {
//     console.log('get item: '+item);
//   } else {
//     Http
//       .get(url, {})
//       .success(response => {
//         console.log('request success');
//         var data = response.text;
//         let parser = new DOMParser();
//         let doc = parser.parseFromString(data, "text/html");
//         var q = doc.querySelector('title').text;
//         var google = document.createElement('div');
//         google.innerHTML = q;
//         document.body.appendChild(google);
//         stor.set_async('test', q, function(item){
//           console.log('set item: '+q);
//         });
//       })
//       .error((err, res) => {
//         console.log('request error');
//       });
//   }
// });

// var grabber = new Grabber(3293);

// add app div
var app_div = document.createElement('div');
app_div.setAttribute('id', 'app');
document.body.appendChild(app_div);

// for Redux
// const initState = {
//   stock: {
//     page: 'table',
//     stocks: []  
//   }
// };
let stor = new Storage('chrome');
stor.get_async('stocks', (item) => {
  let stocks = item['stocks'];
  if (item['stocks'] === undefined)
    stocks = [];

  const initState = {
    page: 'table',
    stocks: stocks,
    result: {
      name: 'None',
      final: '',
      upDown: '',
      max: '',
      min: ''
    }
  };
  const store = createStore(stockReducers, initState, applyMiddleware(thunk));
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
);});