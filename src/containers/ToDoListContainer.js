import { connect } from 'react-redux';
import { actAddTask, actDelTask } from '../actions/todo';
import ToDoList from '../components/ToDoListRedux/ToDoList';


const mapStateToProps = (state) => ({
  tasks: state
});

const mapDispatchToProps = (dispatch) => ({
  onAddTask: (e) => {
    if (e.key === 'Enter') {
      dispatch(actAddTask(e.target.value));
      e.target.value = '';
    }
  },
  onDelTask: (idx) => {
    dispatch(actDelTask(idx));
  }
});

const ToDoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);

export default ToDoListContainer;