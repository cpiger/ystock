import Storage from './Storage';
import * as consts from '../constants';


class Migrator {
  constructor(type) {
    this.stor = new Storage('chrome');
  }

  migrate() {
    return this._migrate_001();
  }

  _migrate_001() {
    // 2018/05/29
    return new Promise((resolve, reject) => {
      this.stor.get_async(null, (result) => {
        console.log('before migrate 001', result);
        if ('stocks' in result) {
          console.log('migrate 001');
          let orgStocks = result.stocks;
          let tabs = [];
          for (let i=0 ; i<consts.TAB_NUM ; i++) {
            let tabInfo = {
              key: i + 1,
              stocks: []
            }
  
            if (i === 0) {
              tabInfo.stocks = orgStocks;
            }
  
            tabs.push(tabInfo);
          }
  
          let finalInfo = {
            tabs: tabs,
            currTab: 1
          };

          this.stor.clear();
          this.stor.set_async(finalInfo, () => {
            console.log(finalInfo);
            console.log('migrate 001 over');
            resolve(finalInfo);
          });
        } else {
          resolve(result);
        }
      });
    });
  }

}

export default Migrator;