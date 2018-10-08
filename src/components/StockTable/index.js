import React from 'react';
import TabContainer from './TabContainer';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Loading from './Loading';
import StockInfo from './StockInfo';

import * as consts from '../../constants';

/*const StockTable = ({
  page,
  stocks,
  result,
  onSearch,
  onAddStock,
  onDelStock,
  onGoHome,
  onReloadAll
}) => (
  <div className="stock-table">
    <SearchBar stocks={stocks} onSearch={onSearch} onReloadAll={onReloadAll}/>
    {
      page == 'search' ? <SearchResult stock={result} onGoHome={onGoHome} onAddStock={onAddStock}/> : <Table stocks={stocks} onDelStock={onDelStock}/>
    }
  </div>
);*/


class StockTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // init load
    this.props.onReloadAll(this.props.currTab - 1);
  }

  render() {
    const {tabs, currTab} = this.props;
    let pageUI = (<TabContainer tabs={tabs} currTab={currTab}
                   onDelStock={this.props.onDelStock} onStockInfo={this.props.onStockInfo} 
                   onReloadStocks={this.props.onReloadAll} onChangeTab={this.props.onChangeTab} 
                   onSortEnd={this.props.onSortEnd}
                   onImportStocks={this.props.onImportStocks}
                  />);
    if (this.props.page === consts.PG_SEARCH) {
      pageUI = <SearchResult stock={this.props.result} currTab={currTab} onGoHome={this.props.onGoHome} onAddStock={this.props.onAddStock} />;
    } else if (this.props.page === consts.PG_LOADING) {
      pageUI = <Loading />
    } else if (this.props.page === consts.PG_STOCK_INFO) {
      pageUI = <StockInfo stock={this.props.result} onGoHome={this.props.onGoHome} />;
    }

    return (
      <div className="stock-table">
        <SearchBar currTab={currTab} onSearch={this.props.onSearch} onReloadAll={this.props.onReloadAll} />
        {pageUI}
      </div>
    );
  }
}

// StockTable.defaultProps = {
//   page: 'table'
// }

export default StockTable;