import { connect } from 'react-redux';
import { actSearchStock, actAddStock, actDelStock } from '../actions/stock';
import StockTable from '../components/StockTable';


const mapStateToProps = (state) => ({
  tasks: state
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (e) => {

  },
  onAddStock: (e) => {
    if (e.key === 'Enter') {
      dispatch(actAddStock(e.target.value));
      e.target.value = '';
    }
  },
  onDelStock: (idx) => {
    dispatch(actDelStock(idx));
  }
});

const StockTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StockTable);

export default StockTableContainer;