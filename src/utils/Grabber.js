import Http from './Http';

class Grabber {
  constructor(stock) {
    this.stockId = stock;
    this.url = `https://tw.stock.yahoo.com/q/q?s=${stock}`;
  }

  getData(onGetData) {
    Http
      .get(this.url, {})
      .success(response => {
        console.log('request success: ' + this.url);
        let rst = this.parser(response.text);
        console.log('get data from: '+this.url);
        onGetData(rst);
      })
      .error(this.onError);
  }

  parser(rawData) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(rawData, "text/html");
      let tableDoc = doc.querySelectorAll('table>tbody>tr>td>table')[2];
      let dataList = tableDoc.querySelectorAll('tr>td');
      let rst = {
        id: 0,
        name: 'None',
        final: '',
        upDown: '',
        max: '',
        min: ''
      };

      if (dataList[0].textContent.indexOf('加到投資組合') == -1) {
        return rst;
      }

      rst = {
        id: this.stockId,
        name: dataList[0].textContent.replace('加到投資組合', ''),
        final: dataList[2].textContent,
        upDown: dataList[5].textContent,
        max: dataList[9].textContent,
        min: dataList[10].textContent
      };
      console.log(dataList);
      return rst;
  }

  onError(err, res) {
    console.log('request error: ' + this.url);
  }
}

export default Grabber;