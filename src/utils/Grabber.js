import Http from './Http';

class Grabber {
  constructor(stock) {
    this.url = `https://tw.stock.yahoo.com/q/q?s=${stock}`;
    Http
      .get(this.url, {})
      .success(response => {
        console.log('request success: ' + this.url);
        let rst = this.parser(response.text);
        this.onGetData(rst);
      })
      .error(this.onError);
  }

  parser(rawData) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(rawData, "text/html");
      let tableDoc = doc.querySelectorAll('table>tbody>tr>td>table')[2];
      let dataList = tableDoc.querySelectorAll('tr>td');

      let rst = {
        name: dataList[0].textContent,
        final: dataList[2].textContent
      };
      console.log(dataList);
      return rst;
  }

  onGetData(data) {
    console.log('get data from: '+this.url);
    console.log(data);
  }

  onError(err, res) {
    console.log('request error: ' + this.url);
  }
}

export default Grabber;