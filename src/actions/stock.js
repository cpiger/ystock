import co from 'co';

import * as consts from '../constants';
import {searchFlow, reloadAllFlow, best5Flow} from '../asyncs/flows';
import Storage from '../utils/Storage';


// // ES6版本
// var Thunk = function(obj, fn) {
//   return function (...args) {
//     return function (callback) {
//       console.log("Thunk");
//       console.log(callback);
//       return fn.call(obj, ...args, callback);
//     }
//   };
// };

// function* gen(stocks) {
//   for (let stock of stocks) {
//     console.log('get stock: '+stock.id);
//     var grabber = new Grabber(stock.id);
//     let grabberThunk = Thunk(grabber, grabber.getData);
//     let rst = yield grabberThunk(); 
//   }
// }


///////////////////////////
// ACTION CREATORS
///////////////////////////
const actSearchStock = (stockQuery) => (dispatch, getState) => {
  dispatch(actShowPageLoading());
  co(searchFlow(stockQuery)).then((value) => {
    dispatch(actSearchStockOver(value));
  });
};

const actSearchStockOver = (stock) => ({
  type: consts.SEARCH_STOCK_OVER,
  stock
});

const actAddStock = (tabIdx, stock) => ({
  type: consts.ADD_STOCK,
  tabIdx,
  stock
});

const actDelStock = (id) => ({
  type: consts.DEL_STOCK,
  id
});

const actStockInfo = (stock) => (dispatch, getState) => {
  dispatch(actShowPageLoading());
  co(best5Flow(stock.id)).then((value) => {
    stock.info = value.mem;
    dispatch(actStockInfoOver(stock));
  });
};

const actStockInfoOver = (stock) => ({
  type: consts.STOCK_INFO_OVER,
  stock
});

const actGoHome = () => ({
  type: consts.GO_HOME
});

// const actReloadAll = (stocks) => (dispatch, getState) => {
//   console.log("actReloadAll");
//   console.log(stocks);
//   var g = gen(stocks);
//   let newStocks = [];

//   function next(err, res) {
//     console.log('fetch');
//     console.log(res);
//     if (err) {
//       console.log('error');
//       return;
//     }

//     if (res)
//       newStocks.push(res);
//     var result = g.next();
//     console.log(result);
//     if (result.done) {
//       console.log('run done');
//       dispatch(actReloadAllOver(newStocks));
//       return;
//     }
//     console.log('call value');
//     result.value(next);
//   }

//   next();
// };

const actReloadAll = (tabIdx) => (dispatch, getState) => {
  if (tabIdx < 0 || tabIdx >= consts.TAB_NUM) {
    console.log('tabIdx over boundary');
    return;
  }

  const state = getState();
  const stocks = state.tabs[tabIdx].stocks;
  if (state.page === consts.PG_STOCK_INFO) {
    dispatch(actShowPageLoading());
    co(best5Flow(state.result.id)).then((value) => {
      state.result.info = value.mem;
      dispatch(actStockInfoOver(state.result));
    });
  } else {
    dispatch(actShowTableLoading());
    co(reloadAllFlow(stocks)).then((value) => {
      // save to local storage
      let stor = new Storage('chrome');
      let storVal = {
        tabs: state.tabs,
        currTab: state.currTab
      };
      storVal.tabs[tabIdx].stocks = value;
      stor.set_async(storVal, () =>{ console.log('save to stor', storVal); });
      dispatch(actReloadAllOver(tabIdx, state.currTab, value));
    });
  }
};

const actShowTableLoading = () => ({
  type: consts.SHOW_TABLE_LOADING
})

const actShowPageLoading = () => ({
  type: consts.SHOW_PAGE_LOADING
})

const actReloadAllOver = (tabIdx, currTab, tabStocks) => ({
  type: consts.RELOAD_STOCKS_OVER,
  tabIdx,
  currTab,
  tabStocks
});

const actSwitch2Tab = (targetTabKey) => ({
  type: consts.SWITCH_TO_TAB,
  targetTabKey
});

const actChangeTab = (targetTabKey) => (dispatch, getState) => {
  dispatch(actSwitch2Tab(targetTabKey));

  // donate and option page will not do reload because the key is out of bound
  // it will print log and return
  dispatch(actReloadAll(targetTabKey - 1));
};


export {
  actSearchStock, actAddStock, actDelStock, actStockInfo,
  actGoHome, actReloadAll, actReloadAllOver,
  actChangeTab, actSwitch2Tab
};