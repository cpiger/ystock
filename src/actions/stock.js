import co from 'co';

import * as consts from '../constants';
import {reloadAllFlow} from '../asyncs/reload';


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

const actReloadAll = (stocks) => (dispatch, getState) => {
  console.log("actReloadAll");
  console.log(stocks);
  dispatch(actReloadAllLoading());
  co(reloadAllFlow(stocks)).then((value) => {
    console.log('co fin');
    console.log(value);
    dispatch(actReloadAllOver(value));
  });

};

const actReloadAllLoading = () => ({
  type: consts.RELOAD_STOCKS
})

const actReloadAllOver = (stocks) => ({
  type: consts.RELOAD_STOCKS_OVER,
  stocks
});


export { actSearchStock, actAddStock, actDelStock, actGoHome, actReloadAll, actReloadAllOver };