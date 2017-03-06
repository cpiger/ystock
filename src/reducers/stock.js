import * as consts from '../constants';
import Storage from '../utils/Storage';


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


// function *gen(stockId) {
//   var grabber = new Grabber(stockId);
//   let rst = yield grabber.getDataAsync();
//   let stock = rst.success() 
// }

function reloadStocks(state, action) {
  console.log('reload all stocks');
  // let newStocks = [];
  // let count = 0;
  // for (let stock of state.stocks) {

  // }
  let newStocks = state.stocks;

  return {
    page: 'table',
    result: null,
    stocks: newStocks
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

    default:
      return state;
  }
};


export default stockReducers;