import Grabber from '../utils/Grabber';
import Http from '../utils/Http';


///////////////////////////
// Promise FUNCSIONS
///////////////////////////
export var fetchStock = function (stockId) {
  return new Promise(function (resolve, reject) {
    let grabber = new Grabber(stockId);
    grabber.getStockData((err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}


export var fetchStockId = function (stockName) {
  return new Promise(function (resolve, reject) {
    let url = `https://tw.stock.yahoo.com/h/stockmenu.php?stock_name=&ei=utf-8&stock_id=${stockName}&func=G&xSubmit=%ACd%B8%DF`;
    Http
      .get(url, {}, 0)
      .end((err, res) => {
        if (err) return reject(err);
        resolve(res.xhr.responseURL.replace('https://tw.stock.yahoo.com/q/q?s=', ''));
      });
  });
}
