import {fetchStock} from './fetchs';


///////////////////////////
// Flow FUNCSIONS
///////////////////////////
function* searchFlow(stock) {
  let res = yield fetchStock(stock.id);
  return res;
}


function* reloadAllFlow(stocks) {
  let newStocks = [];
  for (let stock of stocks) {
    let res = yield fetchStock(stock.id);
    newStocks.push(res);
  }
  return newStocks;
}


export {searchFlow, reloadAllFlow};
