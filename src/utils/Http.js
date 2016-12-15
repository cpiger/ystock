import request from 'superagent';

var Http =  {
  // constructor() {
  //   this.onSuccess = response => {};
  //   this.onError = (err, res) => {};
  // }

  onSuccess: response => {},
  onError: (err, res) => {},

  _httpCall(method, url, data, config={}) {
    let my = this;
    let req = request(method, url);
    
    if (data) {
      req.send(data);
    }
    if (config.hasOwnProperty('headers')) {
      req.set(config.headers);
    }

    req.end(function(err, res){
      // Calling the end function will send the request
      if (res.error) {
        my.onError(err, res);
        return ;
      }

      my.onSuccess(res);
    });

    return this;
  },

  success(callback) {
    this.onSuccess = callback;
    return this;
  },

  error(callback) {
    this.onError = callback;
    return this;
  },

  get(url, config={}) {
    return this._httpCall('GET', url, {}, config);
  },

  post(url, data, config={}) {
    return this._httpCall('POST', url, data, config);
  },

  put(url, data, config={}) {
    return this._httpCall('PUT', url, data, config);
  },

  del(url, config={}) {
    return this._httpCall('DELETE', url, config);
  }
}


export default Http;