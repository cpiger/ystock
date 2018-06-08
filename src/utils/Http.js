import request from 'superagent';

var Http =  {
  // constructor() {
  //   this.onSuccess = response => {};
  //   this.onError = (err, res) => {};
  // }

  onSuccess: response => {},
  onError: (err, res) => {},

  _httpCall(method, url, data, config={}, redirects=null) {
    let my = this;
    my.req = request(method, url);
    
    if (data) {
      my.req.send(data);
    }
    if (redirects) {
      my.req.redirects(redirects);
    }
    if (config.hasOwnProperty('headers')) {
      my.req.set(config.headers);
    }

    // req.end(function(err, res){
    //   // Calling the end function will send the request
    //   console.log('http');
    //   console.log(res);
    //   if (res.error) {
    //     my.onError(err, res);
    //     return ;
    //   }

    //   my.onSuccess(res);
    // });

    return this;
  },

  end(callback) {
    let my = this;
    my.req.end(function(err, res) {
      if (err) {
        console.log('http error');
      }

      // console.log('http success');
      callback(err, res);
    });
  },

  // success(callback) {
  //   this.onSuccess = callback;
  //   return this;
  // },

  // error(callback) {
  //   this.onError = callback;
  //   return this;
  // },

  get(url, config={}, redirects=null) {
    return this._httpCall('GET', url, {}, config, redirects);
  },

  post(url, data, config={}, redirects=null) {
    return this._httpCall('POST', url, data, config, redirects);
  },

  put(url, data, config={}, redirects=null) {
    return this._httpCall('PUT', url, data, config, redirects);
  },

  del(url, config={}, redirects=null) {
    return this._httpCall('DELETE', url, config, redirects);
  }
}


export default Http;