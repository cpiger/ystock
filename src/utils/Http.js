import request from 'superagent';

class Http {
  constructor() {}

  httpCall(method, url, data, config) {
    request
      .get(url)
      .end(function(err, res){
        // Calling the end function will send the request
        console.log("err: "+err);
        console.log(res);
        var data = res.text;
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, "text/html");
        var q = doc.querySelector('title').text;
        var google = document.createElement('div');
        google.innerHTML = q;
        document.body.appendChild(google);
      });
  }

  success(callback, response) {
    callback(response);
  }
}


export default Http;