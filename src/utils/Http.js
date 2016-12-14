import request from 'superagent';

class Http {
  constructor() {
    this.onSuccess = response => {};
    this.onError = (err, res) => {};
  }

  _httpCall(method, url, data, config) {
    let my = this;
    request
      .get(url)
      .end(function(err, res){
        // Calling the end function will send the request
        if (res.error) {
          my.onError(err, res);
          return ;
        }

        my.onSuccess(res);
      });

    return this;
  }

  success(callback) {
    this.onSuccess = callback;
    return this;
  }

  error(callback) {
    this.onError = callback;
    return this;
  }

  get(url, config) {
    return this._httpCall('GET', url, {}, config);
  }
}


export default Http;