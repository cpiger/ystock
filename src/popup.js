import './sass/main.scss';
import 'babel-polyfill';

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

(async() => {
  try {
    var url = "https://tw.stock.yahoo.com/q/bc?s=5478";
    // var response = await fetch(url);
    // var rps = await response.text();
    var rps = httpGet(url);
    let parser = new DOMParser();
    let doc = parser.parseFromString(rps,"text/html");
    var q = doc.querySelector('title').text;
    var google = document.createElement('div');
    google.innerText = q;
    // google.textContent = ""
    // console.log(rps);
    console.log(google.innerHTML);
    document.body.appendChild(google);
  } catch (e) {
    console.log("Booo");
    console.log(e);
  }
})();