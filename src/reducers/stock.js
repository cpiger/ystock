import * as consts from '../constants';
import Storage from '../utils/Storage';
import Grabber from '../utils/Grabber';
import { actReloadAllOver } from '../actions/stock';


function search(state, action) {
    return {
      page: 'search',
      result: action.stock,
      stocks: state.stocks
    };
}


function addStock(state, action) {
  console.log(`add stock ${action.id}`);
  let newStocks = [
    ...state.stocks,
    action.stock
  ];
  let stor = new Storage('chrome');
  stor.set_async('stocks', newStocks, () =>{console.log('aaaaa')});
  return {
    page: 'table',
    result: null,
    stocks: newStocks
  };
}


function delStock(state, action) {
  console.log(`delete stock ${action.id}`);
  let newStocks = [];
  for (let stock of state.stocks) {
    if (stock.id === action.id) {
      console.log(`deleted ${action.id}`);
      continue;
    }
    newStocks.push(stock);
  }

  let stor = new Storage('chrome');
  stor.set_async('stocks', newStocks, () =>{console.log('aaaaa')});
  return {
    page: 'table',
    result: null,
    stocks: newStocks
  };
}


function goHome(state, action) {
    return {
      page: 'table',
      result: null,
      stocks: [
        ...state.stocks
      ]
    }
}


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

function runFetchStocks(stocks) {
  var g = gen(stocks);
  let newStocks = [];

  // var rst = g.next();
  // rst.value(response => {
  //   newStocks.push(response);
  //   rst = g.next();
  //   rst.value(response => {
  //     newStocks.push(response);
  //   });
  // });

  // return newStocks;

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
}

function reloadStocks(state, action) {
  console.log('reload all stocks');
  console.log('runFetchStocks');
  console.log(state);
  console.log(action);
  runFetchStocks(state.stocks);

  console.log('runFetchStocks over');
  return {
    page: 'table',
    result: null,
    stocks: state.stocks
  };
}


function reloadStocksOver(state, action) {
  console.log('reload all stocks over');
  return {
    page: 'table',
    result: null,
    stocks: action.stocks
  };
}

const stockReducers = (state, action) => {
  switch (action.type) {
    case consts.SEARCH_STOCK:
      return search(state, action);

    case consts.ADD_STOCK:
      return addStock(state, action);

    case consts.DEL_STOCK:
      return delStock(state, action);

    case consts.GO_HOME:
      return goHome(state, action);

    case consts.RELOAD_STOCKS:
      return reloadStocks(state, action);

    case consts.RELOAD_STOCKS_OVER:
      return reloadStocksOver(state, action);


    default:
      return state;
  }
};


export default stockReducers;