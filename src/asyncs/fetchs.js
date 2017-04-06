import Grabber from '../utils/Grabber';


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
