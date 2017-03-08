import * as consts from '../constants';
import Grabber from '../utils/Grabber';


// ES6版本
var Thunk = function(obj, fn) {
  return function (...args) {
    return function (callback) {
      console.log("Thunk");
      console.log(callback);
      return fn.call(obj, ...args, callback);
    }
  };
};

function* gen(stocks) {
  for (let stock of stocks) {
    console.log('get stock: '+stock.id);
    var grabber = new Grabber(stock.id);
    let grabberThunk = Thunk(grabber, grabber.getData);
    let rst = yield grabberThunk(); 
  }
}

// creator





const actSearchStock = (stock) => ({
  type: consts.SEARCH_STOCK,
  stock
});

const actAddStock = (stock) => ({
  type: consts.ADD_STOCK,
  stock
});

const actDelStock = (id) => ({
  type: consts.DEL_STOCK,
  id
});

const actGoHome = () => ({
  type: consts.GO_HOME
});

const actReloadAll = (stocks) => (dispatch, getState) => {
  console.log("actReloadAll");
  console.log(stocks);
  var g = gen(stocks);
  let newStocks = [];

  function next(response) {
    console.log('fetch');
    console.log(response);
    if (response)
      newStocks.push(response);
    var result = g.next();
    console.log(result);
    if (result.done) {
      console.log('run done');
      dispatch(actReloadAllOver(newStocks));
      return;
    }
    console.log('call value');
    result.value(next);
  }

  next();
};

const actReloadAllOver = (stocks) => ({
  type: consts.RELOAD_STOCKS_OVER,
  stocks
});


export { actSearchStock, actAddStock, actDelStock, actGoHome, actReloadAll, actReloadAllOver };