import Grabber from '../utils/Grabber';


///////////////////////////
// Promise FUNCSIONS
///////////////////////////
var fetchStock = function (stockId) {
  return new Promise(function (resolve, reject) {
    let grabber = new Grabber(stockId);
    grabber.getData((err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}


///////////////////////////
// Flow FUNCSIONS
///////////////////////////
function* reloadAllFlow(stocks) {
  let newStocks = [];
  for (let stock of stocks) {
    let res = yield fetchStock(stock.id);
    newStocks.push(res);
  }

  console.log('fin reloadAllFlow');
  console.log(newStocks);
  return newStocks;
}


export {reloadAllFlow};