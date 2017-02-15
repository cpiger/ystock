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


export { actSearchStock, actAddStock, actDelStock, actGoHome };