import { connect } from 'react-redux';
import { actSearchStock, actAddStock, actDelStock, actGoHome } from '../actions/stock';
import StockTable from '../components/StockTable';


const mapStateToProps = (state) => ({
  stocks: state
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => {
    dispatch(actSearchStock(query));
  },
  onAddStock: (e) => {
    dispatch(actAddStock(e.target.value));
  },
  onDelStock: (idx) => {
    dispatch(actDelStock(idx));
  },
  onGoHome: (e) => {
    dispatch(actGoHome());
  }
});

const StockTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StockTable);


export default StockTableContainer;