import { connect } from 'react-redux';
import { actSearchStock, actAddStock, actDelStock, actGoHome } from '../actions/stock';
import StockTable from '../components/StockTable';


// const mapStateToProps = (state) => ({
//   page: state.page,
//   stocks: state.stocks
// });

const mapStateToProps = function(state) {
  return {
    page: state.page,
    stocks: state.stocks,
    result: state.result
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSearch: (stock) => {
    console.log('onSearch click');
    dispatch(actSearchStock(stock));
  },
  onAddStock: (stock) => {
    console.log('adddddd');
    console.log(stock);
    dispatch(actAddStock(stock));
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