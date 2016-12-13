import './sass/main.scss';
import 'babel-polyfill';

var dd = document.createElement('div');
dd.innerHTML = 'aaaa';
dd.className = 'test';
document.body.appendChild(dd);

// let response = await fetch(this.comicUrl);
// let rtxt = await response.text();

(async() => {
  try {
    var url = "https://tw.stock.yahoo.com/q/bc?s=5478";
    var response = await fetch(url, {
      headers: {  
        "Content-type": "text/html; charset=big5"  
      }      
    });
    var rps = await response.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(rps,"text/html");
    var q = doc.querySelector('title').text;
    var google = document.createElement('div');
    google.innerHTML = q;
    // console.log(rps);
    document.body.appendChild(google);
  } catch (e) {
    console.log("Booo");
    console.log(e);
  }
})();