import * as consts from '../constants';
import Storage from '../utils/Storage';


// 這邊先做成更改旗標而不是刪除
function delStock(task, action) {
  // console.log(task);
  // console.log(action);
  if (task.id != action.id) return task;
  return {
    id: action.id,
    done: true,
    content: task.content
  };
}


const stockReducers = (state={}, action) => {
  switch (action.type) {
    case consts.SEARCH_STOCK:
      return {
        page: 'search',
        result: action.stock,
        stocks: []
      };

    case consts.ADD_STOCK:
      let newStocks = [
        ...state.stocks,
        action.stock
      ];
      console.log('nnnn');
      console.log(newStocks);
      console.log(action.stock);
      let stor = new Storage('chrome');
      stor.set_async('stocks', newStocks, () =>{console.log('aaaaa')});
      return {
        page: 'table',
        result: null,
        stocks: newStocks
      };

    case consts.DEL_STOCK:
      return {
        page: 'table',
        result: null,
        stocks: [
          ...state.stocks
        ]
      };

      // return state.map(
      //   task => delTask(task, action)
      // );

    case consts.GO_HOME:
      return {
        page: 'table',
        result: null,
        stocks: [
          ...state.stocks
        ]
      }

    default:
      return state;
  }
};


export default stockReducers;