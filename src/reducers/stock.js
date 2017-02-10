
function addTask(action) {
  // console.log(action);
  return {
    id: action.id,
    done: false,
    content: action.content
  };
}

// 這邊先做成更改旗標而不是刪除
function delTask(task, action) {
  // console.log(task);
  // console.log(action);
  if (task.id != action.id) return task;
  return {
    id: action.id,
    done: true,
    content: task.content
  };
}


const stockReducers = (state=[], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        addTask(action)
      ];

    case 'DEL_TASK':
      return state.map(
        task => delTask(task, action)
      );

    default:
      return state;
  }
};


export default stockReducers;