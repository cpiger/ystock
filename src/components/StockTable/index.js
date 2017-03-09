import React from 'react';
import Table from './Table';
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

const StockTable = ({
  page,
  stocks,
  result,
  onSearch,
  onAddStock,
  onDelStock,
  onGoHome,
  onReloadAll
}) => {
  let pageUI = <Table stocks={stocks} onDelStock={onDelStock} />;
  if (page === 'search') {
    pageUI = <SearchResult stock={result} onGoHome={onGoHome} onAddStock={onAddStock} />;
  } else if (page === 'loading') {
    pageUI = <Loading />;
  }

  return (
    <div className="stock-table">
      <SearchBar stocks={stocks} onSearch={onSearch} onReloadAll={onReloadAll} />
      {pageUI}
    </div>
  );
}

// StockTable.defaultProps = {
//   page: 'table'
// }

export default StockTable;