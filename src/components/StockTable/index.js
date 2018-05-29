import React from 'react';
import TabContainer from './TabContainer';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Loading from './Loading';


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
    // let stocks = this.props.stocks;
    // if (stocks && stocks.length > 0)
    //   this.props.onReloadAll(stocks);
  }

  render() {
    const {tabs, currTab} = this.props;
    let pageUI = <TabContainer tabs={tabs} currTab={currTab} onDelStock={this.props.onDelStock} onReloadStocks={this.props.onReloadAll} />;
    if (this.props.page === 'search') {
      pageUI = <SearchResult stock={this.props.result} onGoHome={this.props.onGoHome} onAddStock={this.props.onAddStock} />;
    } else if (this.props.page === 'loading') {
      pageUI = <Loading />;
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