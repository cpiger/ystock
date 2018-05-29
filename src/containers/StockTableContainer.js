import { connect } from 'react-redux';
import { actSearchStock, actAddStock, actDelStock, actGoHome, actReloadAll } from '../actions/stock';
import StockTable from '../components/StockTable';


// const mapStateToProps = (state) => ({
//   page: state.page,
//   stocks: state.stocks
// });

const mapStateToProps = function(state) {
  return {
    page: state.page,
    tabs: state.tabs,
    currTab: state.currTab,
    result: state.result
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSearch: (stock) => {
    dispatch(actSearchStock(stock));
  },
  onAddStock: (stock) => {
    dispatch(actAddStock(stock));
  },
  onDelStock: (idx) => {
    dispatch(actDelStock(idx));
  },
  onGoHome: (e) => {
    dispatch(actGoHome());
  },
  onReloadAll: (tabIdx) => {
    dispatch(actReloadAll(tabIdx));
  }
});

const StockTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StockTable);


export default StockTableContainer;