import Http from './Http';

class Grabber {
  constructor(stock) {
    this.stockId = stock;
    this.url = `https://tw.stock.yahoo.com/q/q?s=${stock}`;
  }

  getData(onGetData) {
    Http
      .get(this.url, {})
      .end((err, res) => {
        if (err) {
          console.log('request error: ' + this.url);
          onGetData(err, rst);
          return;
        }
        
        // console.log('request success: ' + this.url);
        let rst = this.parser(res.text);
        // console.log('get data from: '+this.url);
        onGetData(err, rst);
      });
  }

  parser(rawData) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(rawData, "text/html");
      let tableDoc = doc.querySelectorAll('table>tbody>tr>td>table')[2];
      let dataList = tableDoc.querySelectorAll('tr>td');
      let rst = {
        id: 0,
        name: '此股票不存在',
        final: '0',
        upDown: '0',
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
        max: dataList[9].textContent,
        min: dataList[10].textContent
      };
      return rst;
  }
}

export default Grabber;