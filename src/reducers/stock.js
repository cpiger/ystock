import _ from 'lodash';

import * as consts from '../constants';
import Storage from '../utils/Storage';
import {arrayMove} from 'react-sortable-hoc';


function searchOver(state, action) {
  return {
    page: consts.PG_SEARCH,
    result: action.stock,
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function addStock(state, action) {
  let targetTab = state.tabs[action.tabIdx];

  // check is new stock exist
  for (var stock of targetTab.stocks) {
    if (stock.id === action.stock.id) {
      console.log(`stock ${stock.id} already exist in tab ${action.tabIdx}`);
      return {
        page: consts.PG_TABLE,
        result: null,
        currTab: state.currTab,
        tabs: state.tabs
      };
    }
  }
  
  targetTab.stocks.push(action.stock);
  let newTabs = _.cloneDeep(state.tabs);

  let stor = new Storage('chrome');
  let finalInfo = {
    tabs: newTabs,
    currTab: state.currTab
  };
  stor.set_async(finalInfo, () => { console.log(`add stock ${action.stock.id}`); });
  return {
    page: consts.PG_TABLE,
    result: null,
    currTab: state.currTab,
    tabs: newTabs
  };
}


function delStock(state, action) {
  let currTab = state.tabs[state.currTab-1];
  let newStocks = [];
  for (let stock of currTab.stocks) {
    if (stock.id === action.id) {
      continue;
    }
    newStocks.push(stock);
  }
  currTab.stocks = newStocks;
  let newTabs = _.cloneDeep(state.tabs);

  let stor = new Storage('chrome');
  let finalInfo = {
    tabs: newTabs,
    currTab: state.currTab
  };
  stor.set_async(finalInfo, () =>{ console.log(`delete stock ${action.id}`) });
  return {
    page: consts.PG_TABLE,
    result: null,
    currTab: state.currTab,
    tabs: newTabs
  };
}


function stockInfoOver(state, action) {
  return {
    page: consts.PG_STOCK_INFO,
    result: action.stock,
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function goHome(state, action) {
  return {
    page: consts.PG_TABLE,
    result: null,
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function showTableLoading(state, action) {
  let tabs = _.cloneDeep(state.tabs);
  tabs[state.currTab-1].status = 'loading';
  return {
    page: state.page,
    result: state.result,
    currTab: state.currTab,
    tabs: tabs
  };
}


function showPageLoading(state, action) {
  return {
    page: consts.PG_LOADING,
    result: null,
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function reloadStocksOver(state, action) {
  let tabs = _.cloneDeep(state.tabs);
  let newTab = tabs[action.tabIdx];
  newTab.status = 'normal';
  newTab.stocks = action.tabStocks;
  return {
    page: state.page,
    result: state.result,
    currTab: state.currTab,
    tabs: tabs
  };
}


function switch2Tab(state, action) {
  return {
    page: consts.PG_TABLE,
    result: null,
    currTab: action.targetTabKey,
    tabs: state.tabs
  };
}


function importStocks(state, action) {
  action.importData.forEach((tab, index) => {
    let stateTab = state.tabs[index];
    let stateStocks = stateTab.stocks;
    if (stateTab.key === tab.key) {
      for (let i=0 ; i<tab.stocks.length ; i++) {
        let importStock = tab.stocks[i];
        let exist = false;
        for (let j=0 ; j<stateStocks.length ; j++) {
          if (stateStocks[j].id === importStock.id) {
            exist = true;
            break;
          }
        }

        if (!exist) {
          state.tabs[index].stocks.push(importStock);
        }
      }
    }
  });

  return {
    page: state.page,
    result: null,
    currTab: state.currTab,
    tabs: state.tabs
  };
}


function sortStocks(state, action) {
  let currTab = state.tabs[action.tabIdx];
  let stocks = _.cloneDeep(currTab.stocks);
  stocks = arrayMove(stocks, action.oldIndex, action.newIndex);
  let newTabs = _.cloneDeep(state.tabs);
  newTabs[action.tabIdx].stocks = stocks;

  // save to local storage
  let stor = new Storage('chrome');
  let storVal = {
    tabs: newTabs,
    currTab: state.currTab
  };
  stor.set_async(storVal, () =>{ console.log('save to stor after sorting', storVal); });

  return {
    page: consts.PG_TABLE,
    result: null,
    currTab: state.currTab,
    tabs: newTabs
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

    case consts.STOCK_INFO_OVER:
      return stockInfoOver(state, action);

    case consts.GO_HOME:
      return goHome(state, action);

    case consts.SHOW_TABLE_LOADING:
      return showTableLoading(state, action);

    case consts.SHOW_PAGE_LOADING:
      return showPageLoading(state, action);

    case consts.RELOAD_STOCKS_OVER:
      return reloadStocksOver(state, action);
    
    case consts.SWITCH_TO_TAB:
      return switch2Tab(state, action);

    case consts.SORT_STOCKS:
      return sortStocks(state, action);

    case consts.IMPORT_STOCKS:
      return importStocks(state, action);

    default:
      return state;
  }
};


export default stockReducers;