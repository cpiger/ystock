
class StorageBase {
  get(key) { return null; }
  get_async(key, callback) {}
  set(key, value) { return false; }
  set_async(obj, callback) {}
  remove(key, callback) {}
  clear() {}
}


class Html5Base extends StorageBase {
  get(key) {
    return window.localStorage.getItem(key);
  }

  set(key, value) {
    window.localStorage.setItem(key, value);
    return true;
  }

  remove(key, callback) {
    window.localStorage.removeItem(key);
    callback();
  }
  
  clear() {
    window.localStorage.clear();
  }
}


class ChromeLocal extends StorageBase {
  get_async(key, callback) {
    chrome.storage.local.get(key, callback);
  }

  set_async(obj, callback) {
    chrome.storage.local.set(obj, callback);
  }

  remove(key, callback) {
    chrome.storage.local.remove(key, callback);
  }

  clear() {
    chrome.storage.local.clear();
  }
}


class ChromeSync extends StorageBase {
  get_async(key, callback) {
    chrome.storage.sync.get(key, callback);
  }

  set_async(obj, callback) {
    chrome.storage.sync.set(obj, callback);
  }

  remove(key, callback) {
    chrome.storage.sync.remove(key, callback);
  }  

  clear() {
    chrome.storage.sync.clear();
  }
}

class Storage {
  constructor(type) {
    switch (type) {
      case 'chrome':
        this.base = new ChromeLocal();
        break;

      default:
        this.base = new Html5Base();
        break;
    }
  }

  get(key) { return this.base.get(key); }
  get_async(key, callback) { this.base.get_async(key, callback); }
  set(key, value) { return this.base.set(key, value); }
  set_async(obj, callback) { this.base.set_async(obj, callback); }
  clear() { this.base.clear(); }

}

export default Storage;