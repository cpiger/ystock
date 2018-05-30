import * as consts from '../constants';
import Storage from '../utils/Storage';


function searchOver(state, action) {
  return {
    page: 'search',
    result: action.stock,
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function addStock(state, action) {
  let newStocks = [
    ...state.stocks,
    action.stock
  ];
  let stor = new Storage('chrome');
  stor.set_async('stocks', newStocks, () =>{});
  return {
    page: 'table',
    result: null,
    stocks: newStocks
  };
}


function delStock(state, action) {
  let newStocks = [];
  for (let stock of state.stocks) {
    if (stock.id === action.id) {
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
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function showLoading(state, action) {
  return {
    page: 'loading',
    result: null,
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function reloadStocksOver(state, action) {
  return {
    page: 'table',
    result: null,
    currTab: action.currTab,
    tabs: action.tabs
  };
}


function switch2Tab(state, action) {
  return {
    page: 'table',
    result: null,
    currTab: action.targetTabKey,
    tabs: state.tabs
  };
}

const stockReducers = (state, action) => {
  switch (action.type) {
    case consts.SEARCH_STOCK_OVER:
      return searchOver(state, action);

    case consts.ADD_STOCK:
      return addStock(state, action);

    case consts.DEL_STOCK:
      return delStock(state, action);

    case consts.GO_HOME:
      return goHome(state, action);

    case consts.SHOW_LOADING:
      return showLoading(state, action);

    case consts.RELOAD_STOCKS_OVER:
      return reloadStocksOver(state, action);
    
    case consts.SWITCH_TO_TAB:
      return switch2Tab(state, action);


    default:
      return state;
  }
};


export default stockReducers;