import { connect } from 'react-redux';
import { 
  actSearchStock, actAddStock, actDelStock, actGoHome,
  actStockInfo, actReloadAll, actChangeTab, actSortStocks
} from '../actions/stock';
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
  onSearch: (stockQuery) => {
    dispatch(actSearchStock(stockQuery));
  },
  onAddStock: (tabIdx, stock) => {
    dispatch(actAddStock(tabIdx, stock));
  },
  onDelStock: (idx) => {
    dispatch(actDelStock(idx));
  },
  onStockInfo: (idx) => {
    dispatch(actStockInfo(idx));
  },
  onGoHome: (e) => {
    dispatch(actGoHome());
  },
  onReloadAll: (tabIdx) => {
    dispatch(actReloadAll(tabIdx));
  },
  onChangeTab: (targetTabKey) => {
    dispatch(actChangeTab(targetTabKey));
  },
  onSortEnd: (tabIdx, oldIndx, newIndex) => {
    dispatch(actSortStocks(tabIdx, oldIndx, newIndex));
  }
});

const StockTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StockTable);


export default StockTableContainer;