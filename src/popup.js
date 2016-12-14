import './sass/main.scss';
// import 'babel-polyfill';
// import 'whatwg-fetch';
// import 'imports?this=>global!exports?global.fetch!whatwg-fetch';
import request from 'superagent';
import Http from './utils/Http';

var dd = document.createElement('div');
dd.innerHTML = 'aaaa';
dd.className = 'test';
document.body.appendChild(dd);

// let response = await fetch(this.comicUrl);
// let rtxt = await response.text();

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

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
var url = "https://tw.stock.yahoo.com/q/bc?s=5478";
// var url = "https://tw.yahoo.com";
// request
//   .get(url)
//   .end(function(err, res){
//     // Calling the end function will send the request
//     console.log("err: "+err);
//     console.log(res);
//     var data = res.text;
//     let parser = new DOMParser();
//     let doc = parser.parseFromString(data, "text/html");
//     var q = doc.querySelector('title').text;
//     var google = document.createElement('div');
//     google.innerHTML = q;
//     document.body.appendChild(google);
//   });

var req = new Http();
req
  .get(url, {})
  .success(response => {
    console.log('success');
    var data = response.text;
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    var q = doc.querySelector('title').text;
    var google = document.createElement('div');
    google.innerHTML = q;
    document.body.appendChild(google);
  })
  .error((err, res) => {
    alert('request error');
  });