import * as consts from '../constants';

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

const actReloadAll = () => ({
  type: consts.RELOAD_STOCKS
});

const actReloadAllOver = (stocks) => ({
  type: consts.RELOAD_STOCKS_OVER,
  stocks
});


export { actSearchStock, actAddStock, actDelStock, actGoHome, actReloadAll, actReloadAllOver };