import {fetchStock, fetchAllStock, fetchStockId, fetchBest5} from './fetchs';
import {SearchLocalStockId} from '../utils/stocks';


///////////////////////////
// Flow FUNCSIONS
///////////////////////////
function* searchFlow(stockQuery) {
  let stockId = SearchLocalStockId(stockQuery);
  if (stockId === '') {
    stockId = yield fetchStockId(stockQuery);
    if (stockId.includes('error=1')) {
      let rst = {
        id: 0,
        name: '此股票不存在',
        final: '0',
        upDown: '0',
        yestorday: '0',
        max: '0',
        min: '0'
      };
      return rst;
    }
  }
  let res = yield fetchStock(stockId);
  return res;
}


function* reloadAllFlow(stocks) {
  // let newStocks = [];
  // for (let stock of stocks) {
  //   let res = yield fetchStock(stock.id);
  //   newStocks.push(res);
  // }
  // return newStocks;
  let res = yield fetchAllStock(stocks);
  return res;
}


function* best5Flow(stockId) {
  let res = yield fetchBest5(stockId);
  return res;
}


export {searchFlow, reloadAllFlow, best5Flow};
