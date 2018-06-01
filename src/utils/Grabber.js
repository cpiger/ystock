import Http from './Http';

class Grabber {
  constructor(stock=0) {
    this.stockId = stock;
    // this.url = `https://tw.stock.yahoo.com/q/q?s=${stock}`;
  }

  getStockData(onGetData) {
    this.url = `https://tw.stock.yahoo.com/q/q?s=${this.stockId}`;
    Http
      .get(this.url, {})
      .end((err, res) => {
        console.log(`http end ${this.stockId}`, err);
        if (err) {
          console.log('request error: ' + this.url);
          onGetData(err, rst);
          return;
        }
        
        // console.log('request success: ' + this.url);
        let rst = this._parserStock(res.text);
        // console.log('get data from: '+this.url);
        onGetData(err, rst);
      });
  }

  getMarketData(onGetData) {
    this.url = 'https://tw.stock.yahoo.com/';
    Http
      .get(this.url, {})
      .end((err, res) => {
        console.log(err);
        if (err) {
          console.log('request error: ' + this.url);
          onGetData(err, rst);
          return;
        }
        
        // console.log('request success: ' + this.url);
        let rst = this._parserMarket(res.text);
        // console.log('get data from: '+this.url);
        onGetData(err, rst);
      });
  }

  _parserStock(rawData) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(rawData, "text/html");
      let tableDoc = doc.querySelectorAll('table>tbody>tr>td>table')[2];
      let dataList = tableDoc.querySelectorAll('tr>td');
      let rst = {
        id: 0,
        name: '此股票不存在',
        final: '0',
        upDown: '0',
        yestorday: '0',
        max: '0',
        min: '0'
      };

      if (dataList[0].textContent.indexOf('加到投資組合') == -1) {
        return rst;
      }

      let stockName = dataList[0].textContent.replace('加到投資組合', '').replace(this.stockId, '');
      rst = {
        id: this.stockId,
        name: stockName,
        final: dataList[2].textContent,
        upDown: dataList[5].textContent,
        yestorday: dataList[7].textContent,
        max: dataList[9].textContent,
        min: dataList[10].textContent
      };
      return rst;
  }

  _parserMarket(rawData) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(rawData, "text/html");
      let infoTables = doc.querySelectorAll('div.tbd0 table');
      let tseTable = infoTables[0]; // 上市資料
      let otcTable = infoTables[1]; // 上櫃資料

      // 上市
      let tseDataList = tseTable.querySelectorAll('tr td');
      let tseRst = {
        name: '上市',
        final: tseDataList[0].textContent,
        upDown: tseDataList[1].textContent,
        upDownVol: tseDataList[2].textContent,
        volume: tseDataList[3].textContent
      };

      //上櫃
      let otcDataList = otcTable.querySelectorAll('tr td');
      let otcRst = {
        name: '上櫃',
        final: otcDataList[0].textContent,
        upDown: otcDataList[1].textContent,
        upDownVol: otcDataList[2].textContent,
        volume: otcDataList[3].textContent
      };

      return {tseRst, otcRst};
  }
}

export default Grabber;