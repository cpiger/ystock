import * as consts from '../constants';


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
      console.log('onSearch reducer');
      return {
        page: 'search',
        result: action.stock,
        stocks: []
      };

    case consts.ADD_STOCK:
      return {
        page: 'table',
        result: null,
        stocks: [
          ...state.stocks,
          action.stock
        ]
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

    default:
      return state;
  }
};


export default stockReducers;